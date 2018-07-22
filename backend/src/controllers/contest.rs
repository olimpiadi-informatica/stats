// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use rocket::response::Failure;
use rocket_contrib::Json;
use std::collections::HashMap;

use cache::Cache;
use controllers::{contestant_from_user, get_num_medals, Contestant, NumMedals};
use db::DbConn;
use error_status;
use schema;
use std::f32::INFINITY;
use types::{Contest, Participation, Task, TaskScore, User};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestInfoMedal {
    pub number: Option<i32>,
    pub cutoff: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestInfoMedals {
    pub gold: ContestInfoMedal,
    pub silver: ContestInfoMedal,
    pub bronze: ContestInfoMedal,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestNavigation {
    pub previous: Option<i32>,
    pub next: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestDetail {
    pub year: i32,
    pub navigation: ContestNavigation,
    pub location: Option<String>,
    pub region: Option<String>,
    pub num_contestants: Option<i32>,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
    pub tasks: Vec<ContestTask>,
    pub medals: ContestInfoMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PastParticipation {
    pub year: i32,
    pub medal: Option<Medal>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestResult {
    pub rank: Option<i32>,
    pub contestant: Contestant,
    pub region: Option<String>,
    pub score: Option<f32>,
    pub scores: Vec<Option<f32>>,
    pub medal: Option<Medal>,
    pub past_participations: Vec<PastParticipation>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestResults {
    pub navigation: ContestNavigation,
    pub tasks: Vec<String>,
    pub results: Vec<ContestResult>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestRegion {
    pub name: String,
    pub num_participants: Option<i32>,
    pub num_medals: NumMedals,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestRegions {
    pub navigation: ContestNavigation,
    pub regions: Vec<ContestRegion>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestTask {
    pub name: String,
    pub index: i32,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestTasks {
    pub navigation: ContestNavigation,
    pub tasks: Vec<ContestTask>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestInfoTask {
    pub name: String,
    pub index: i32,
    pub max_score_possible: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestInfo {
    pub year: i32,
    pub location: Option<String>,
    pub region: Option<String>,
    pub num_contestants: Option<i32>,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
    pub tasks: Vec<ContestInfoTask>,
    pub medals: ContestInfoMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestsInfo {
    pub contests: Vec<ContestInfo>,
}

fn get_medal_info(participations: &Vec<Participation>, medal: &str) -> ContestInfoMedal {
    let medalist: Vec<&Participation> = participations
        .iter()
        .filter(|part| part.medal.as_ref().map_or(false, |m| m.as_str() == medal))
        .collect();
    ContestInfoMedal {
        number: zero_is_none(medalist.len() as i32),
        cutoff: fold_with_none(Some(INFINITY), medalist.iter(), |min, part| {
            min_option(min, part.score)
        }),
    }
}

fn get_contest_task(task: &Task, task_scores: &Vec<TaskScore>) -> ContestTask {
    let sum_score = fold_with_none(Some(0.0), task_scores.iter(), |m, s| add_option(m, s.score));
    let avg_score = sum_score.map(|sum| sum / (task_scores.len() as f32));
    ContestTask {
        name: task.name.clone(),
        index: task.index,
        max_score_possible: task.max_score,
        max_score: fold_with_none(Some(0.0), task_scores.iter(), |m, s| max_option(m, s.score)),
        avg_score: avg_score,
    }
}

fn get_contest_navigation(year: i32, conn: DbConn) -> Result<ContestNavigation, Error> {
    let years = schema::contests::table
        .select(schema::contests::columns::year)
        .order(schema::contests::columns::year)
        .load::<i32>(&*conn)?;
    let index = years.iter().position(|y| *y == year);
    Ok(ContestNavigation {
        previous: match index {
            Some(0) => None,
            Some(i) => Some(years[i - 1]),
            None => None,
        },
        next: match index {
            Some(i) => if i == years.len() - 1 {
                None
            } else {
                Some(years[i + 1])
            },
            None => None,
        },
    })
}

fn get_contest_list(conn: DbConn) -> Result<Vec<ContestInfo>, Error> {
    let contests = schema::contests::table
        .order(schema::contests::columns::year.desc())
        .load::<Contest>(&*conn)?;
    let participations = Participation::belonging_to(&contests)
        .load::<Participation>(&*conn)?
        .grouped_by(&contests);
    let tasks = Task::belonging_to(&contests)
        .load::<Task>(&*conn)?
        .grouped_by(&contests);
    let mut result: Vec<ContestInfo> = Vec::new();
    for (contest, participations, tasks) in izip!(&contests, &participations, &tasks) {
        let num_contestants = zero_is_none(participations.len() as i32);
        let score_sum = participations
            .iter()
            .fold(Some(0.0), |sum, part| add_option(sum, part.score));

        result.push(ContestInfo {
            year: contest.year,
            location: contest.location.clone(),
            region: contest.region.clone(),
            num_contestants: num_contestants,
            max_score_possible: fold_with_none(Some(0.0), tasks.iter(), |sum, task| {
                add_option(sum, task.max_score)
            }),
            max_score: fold_with_none(Some(0.0), participations.iter(), |max, part| {
                max_option(max, part.score)
            }),
            avg_score: match (score_sum, num_contestants) {
                (Some(sum), Some(num)) => Some(sum / (num as f32)),
                _ => None,
            },
            tasks: tasks
                .iter()
                .map(|t| ContestInfoTask {
                    name: t.name.clone(),
                    index: t.index,
                    max_score_possible: t.max_score,
                })
                .collect(),
            medals: ContestInfoMedals {
                gold: get_medal_info(&participations, "G"),
                silver: get_medal_info(&participations, "S"),
                bronze: get_medal_info(&participations, "B"),
            },
        });
    }
    Ok(result)
}

fn get_contest_info(conn: DbConn, year: i32) -> Result<ContestDetail, Error> {
    let contest = schema::contests::table.find(year).first::<Contest>(&*conn)?;
    let participations = schema::participations::table
        .filter(schema::participations::columns::contest_year.eq(year))
        .load::<Participation>(&*conn)?;
    let tasks = schema::tasks::table
        .filter(schema::tasks::columns::contest_year.eq(year))
        .load::<Task>(&*conn)?;
    let task_scores: HashMap<String, Vec<TaskScore>> = schema::task_scores::table
        .filter(schema::task_scores::columns::contest_year.eq(year))
        .order(schema::task_scores::columns::task_name)
        .load::<TaskScore>(&*conn)?
        .into_iter()
        .group_by(|ts| ts.task_name.clone())
        .into_iter()
        .map(|p| (p.0.clone(), p.1.collect()))
        .collect();

    let score_sum = participations
        .iter()
        .fold(Some(0.0), |sum, part| add_option(sum, part.score));
    let num_contestants = zero_is_none(participations.len() as i32);

    Ok(ContestDetail {
        year: contest.year,
        navigation: get_contest_navigation(year, conn)?,
        location: contest.location.clone(),
        region: contest.region.clone(),
        num_contestants: num_contestants,
        max_score_possible: fold_with_none(Some(0.0), tasks.iter(), |sum, task| {
            add_option(sum, task.max_score)
        }),
        max_score: fold_with_none(Some(0.0), participations.iter(), |max, part| {
            max_option(max, part.score)
        }),
        avg_score: match (score_sum, num_contestants) {
            (Some(sum), Some(num)) => Some(sum / (num as f32)),
            _ => None,
        },
        tasks: tasks
            .iter()
            .map(|t| {
                let scores = task_scores.get(&t.name);
                get_contest_task(t, scores.unwrap_or(&vec![]))
            })
            .collect(),
        medals: ContestInfoMedals {
            gold: get_medal_info(&participations, "G"),
            silver: get_medal_info(&participations, "S"),
            bronze: get_medal_info(&participations, "B"),
        },
    })
}

pub fn get_contest_results(year: i32, conn: DbConn) -> Result<ContestResults, Error> {
    schema::contests::table.find(year).first::<Contest>(&*conn)?;
    let tasks = schema::tasks::table
        .filter(schema::tasks::columns::contest_year.eq(year))
        .order(schema::tasks::columns::index.asc())
        .load::<Task>(&*conn)?;
    let participations: Vec<(Participation, Option<User>)> = schema::participations::table
        .filter(schema::participations::columns::contest_year.eq(year))
        .left_join(schema::users::table)
        .load(&*conn)?;
    let old_participations: HashMap<String, Vec<Participation>> = schema::participations::table
        .filter(
            schema::participations::columns::user_id
                .eq_any(participations.iter().map(|(p, _u)| p.user_id.clone()))
                .and(schema::participations::columns::contest_year.lt(year)),
        )
        .order(schema::participations::columns::user_id)
        .then_order_by(schema::participations::columns::contest_year.desc())
        .load::<Participation>(&*conn)?
        .into_iter()
        .group_by(|p| p.user_id.clone())
        .into_iter()
        .map(|p| (p.0.clone(), p.1.collect()))
        .collect();

    let part_from_user_id: HashMap<&str, (&Participation, &Option<User>)> = participations
        .iter()
        .map(|p: &(Participation, Option<User>)| (p.0.user_id.as_str(), (&p.0, &p.1)))
        .collect();

    let mut results: Vec<ContestResult> = Vec::new();
    let empty_vec: Vec<Participation> = vec![];

    for (user_id, scores) in schema::task_scores::table
        .filter(schema::task_scores::columns::contest_year.eq(year))
        .order(schema::task_scores::columns::user_id.asc())
        .load::<TaskScore>(&*conn)?
        .into_iter()
        .group_by(|t| t.user_id.clone())
        .into_iter()
    {
        let (ref participation, ref user) = match part_from_user_id.get(user_id.as_str()) {
            Some((p, Some(u))) => (p, u),
            _ => return Err(Error::NotFound),
        };

        let scores: Vec<Option<f32>> = scores
            .collect::<Vec<TaskScore>>()
            .iter()
            .map(|s| s.score)
            .collect();
        let old_parts = match old_participations.get(&user_id) {
            Some(v) => v,
            None => &empty_vec,
        }.iter()
            .map(|p| PastParticipation {
                year: p.contest_year,
                medal: medal_from_string(&p.medal),
            })
            .collect();

        results.push(ContestResult {
            rank: participation.position,
            contestant: contestant_from_user(&user),
            region: participation.region.clone(),
            score: participation.score,
            scores: scores,
            medal: medal_from_string(&participation.medal),
            past_participations: old_parts,
        });
    }

    results.sort_by_key(|r| r.rank);

    Ok(ContestResults {
        navigation: get_contest_navigation(year, conn)?,
        tasks: tasks.iter().map(|t| t.name.clone()).collect(),
        results: results,
    })
}

pub fn get_contest_regions(year: i32, conn: DbConn) -> Result<ContestRegions, Error> {
    // throw a 404 if the contest doesn't exist, an empty set is retuned if the contest exists but
    // there are no participations
    schema::contests::table.find(year).first::<Contest>(&*conn)?;

    let mut result: Vec<ContestRegion> = Vec::new();

    for (region, participations) in schema::participations::table
        .filter(
            schema::participations::contest_year
                .eq(year)
                .and(schema::participations::region.is_not_null()),
        )
        .order(schema::participations::region)
        .load::<Participation>(&*conn)?
        .into_iter()
        .group_by(|p| p.region.clone())
        .into_iter()
        .map(|(r, p)| (r, p.collect::<Vec<Participation>>()))
    {
        let region = region.ok_or(Error::NotFound)?;
        let sum_score = fold_with_none(Some(0.0), participations.iter(), |m, p| {
            add_option(m, p.score)
        });
        let mut num_medals = get_num_medals(&participations);
        let avg_score = sum_score.map(|sum| sum / (participations.len() as f32));

        result.push(ContestRegion {
            name: region,
            num_participants: zero_is_none(participations.len() as i32),
            num_medals: num_medals,
            max_score: fold_with_none(Some(0.0), participations.iter(), |m, p| {
                max_option(m, p.score)
            }),
            avg_score: avg_score,
        });
    }

    Ok(ContestRegions {
        navigation: get_contest_navigation(year, conn)?,
        regions: result,
    })
}

pub fn get_contest_tasks(year: i32, conn: DbConn) -> Result<ContestTasks, Error> {
    schema::contests::table.find(year).first::<Contest>(&*conn)?;

    let mut result: Vec<ContestTask> = Vec::new();
    for task in schema::tasks::table
        .filter(schema::tasks::columns::contest_year.eq(year))
        .order(schema::tasks::columns::index)
        .load::<Task>(&*conn)?
    {
        let scores: Vec<TaskScore> = schema::task_scores::table
            .filter(
                schema::task_scores::columns::contest_year
                    .eq(year)
                    .and(schema::task_scores::columns::task_name.eq(task.name.clone())),
            )
            .load(&*conn)?;
        result.push(get_contest_task(&task, &scores));
    }

    Ok(ContestTasks {
        navigation: get_contest_navigation(year, conn)?,
        tasks: result,
    })
}

#[get("/contests")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<ContestsInfo>, Failure> {
    match get_contest_list(conn) {
        Ok(contests) => Ok(Json(cache.set(ContestsInfo { contests: contests }))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>")]
pub fn search(year: i32, conn: DbConn, mut cache: Cache) -> Result<Json<ContestDetail>, Failure> {
    match get_contest_info(conn, year) {
        Ok(contest) => Ok(Json(cache.set(contest))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/results")]
pub fn results(year: i32, conn: DbConn, mut cache: Cache) -> Result<Json<ContestResults>, Failure> {
    match get_contest_results(year, conn) {
        Ok(res) => Ok(Json(cache.set(res))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/regions")]
pub fn regions(year: i32, conn: DbConn, mut cache: Cache) -> Result<Json<ContestRegions>, Failure> {
    match get_contest_regions(year, conn) {
        Ok(res) => Ok(Json(cache.set(res))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/tasks")]
pub fn tasks(year: i32, conn: DbConn, mut cache: Cache) -> Result<Json<ContestTasks>, Failure> {
    match get_contest_tasks(year, conn) {
        Ok(res) => Ok(Json(cache.set(res))),
        Err(err) => Err(error_status(err)),
    }
}

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::dsl::count;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use std::collections::HashMap;
use std::f32::INFINITY;

use controllers::{get_num_medals, NumMedals};
use db::DbConn;
use models::participation::{
    get_contests_participations, get_participations, get_participations_per_regions_per_year,
    get_participations_with_user, get_past_contest_participations, PastParticipation,
};
use models::task::{get_scores_of_year, get_tasks_of_year};
use models::task_score::{get_contest_task_scores, get_scores_of_task};
use models::user::{contestant_from_user, Contestant};
use schema;
use types::{Contest, Participation, Task, TaskScore, User, Year};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestInfoMedal {
    pub number: Option<usize>,
    pub cutoff: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestLocation {
    pub location: Option<String>,
    pub gmaps: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestNavigation {
    pub current: Year,
    pub previous: Option<Year>,
    pub next: Option<Year>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestTask {
    pub name: String,
    pub title: String,
    pub link: Option<String>,
    pub index: usize,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestInfoMedals {
    pub gold: ContestInfoMedal,
    pub silver: ContestInfoMedal,
    pub bronze: ContestInfoMedal,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestDetail {
    pub navigation: ContestNavigation,
    pub location: ContestLocation,
    pub region: Option<String>,
    pub num_contestants: Option<usize>,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
    pub tasks: Vec<ContestTask>,
    pub medals: ContestInfoMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestTaskShortDetail {
    pub name: String,
    pub title: String,
    pub link: Option<String>,
    pub index: usize,
    pub max_score_possible: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestShortDetail {
    pub year: Year,
    pub location: ContestLocation,
    pub region: Option<String>,
    pub num_contestants: Option<usize>,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
    pub tasks: Vec<ContestTaskShortDetail>,
    pub medals: ContestInfoMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestsInfo {
    pub contests: Vec<ContestShortDetail>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestResult {
    pub rank: Option<usize>,
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
    pub num_participants: Option<usize>,
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
pub struct ContestTasks {
    pub navigation: ContestNavigation,
    pub tasks: Vec<ContestTask>,
}

pub fn get_contest(conn: &DbConn, year: Year) -> Result<Contest, Error> {
    schema::contests::table.find(year).first::<Contest>(&**conn)
}

pub fn get_contests(conn: &DbConn) -> Result<Vec<Contest>, Error> {
    schema::contests::table
        .order(schema::contests::columns::year.desc())
        .load::<Contest>(&**conn)
}

#[allow(dead_code)]
pub fn get_num_contests(conn: &DbConn) -> Result<u64, Error> {
    schema::contests::table
        .select(count(schema::contests::columns::year))
        .first::<i64>(&**conn)
        .map(|c| c as u64)
}

pub fn get_contest_info_medal(
    participations: &Vec<Participation>,
    medal: &str,
) -> ContestInfoMedal {
    let medalist: Vec<&Participation> = participations
        .iter()
        .filter(|part| part.medal.as_ref().map_or(false, |m| m.as_str() == medal))
        .collect();
    ContestInfoMedal {
        number: zero_is_none(medalist.len()),
        cutoff: fold_with_none(Some(INFINITY), medalist.iter(), |min, part| {
            min_option(min, part.score)
        }),
    }
}

pub fn get_contest_location(contest: &Contest) -> ContestLocation {
    ContestLocation {
        location: contest.location.clone(),
        gmaps: contest.gmaps.clone(),
        latitude: contest.latitude,
        longitude: contest.longitude,
    }
}

pub fn get_contest_navigation(year: Year, conn: DbConn) -> Result<ContestNavigation, Error> {
    let years = schema::contests::table
        .select(schema::contests::columns::year)
        .order(schema::contests::columns::year)
        .load::<Year>(&*conn)?;
    let index = years.iter().position(|y| *y == year);
    Ok(ContestNavigation {
        current: year,
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

pub fn get_contest_task(task: &Task, task_scores: &Vec<TaskScore>) -> ContestTask {
    let sum_score = fold_with_none(Some(0.0), task_scores.iter(), |m, s| add_option(m, s.score));
    let avg_score = sum_score.map(|sum| sum / (task_scores.len() as f32));
    ContestTask {
        name: task.name.clone(),
        title: task.title.clone(),
        link: task.link.clone(),
        index: task.index as usize,
        max_score_possible: task.max_score,
        max_score: fold_with_none(Some(0.0), task_scores.iter(), |m, s| max_option(m, s.score)),
        avg_score: avg_score,
    }
}

pub fn get_contest_detail(conn: DbConn, year: Year) -> Result<ContestDetail, Error> {
    let contest = get_contest(&conn, year)?;
    let participations = get_participations(&conn, year)?;
    let tasks = get_tasks_of_year(&conn, year)?;
    let task_scores: HashMap<String, Vec<TaskScore>> = get_scores_of_year(&conn, year)?;

    let score_sum = participations
        .iter()
        .fold(Some(0.0), |sum, part| add_option(sum, part.score));
    let num_contestants = zero_is_none(participations.len());

    Ok(ContestDetail {
        navigation: get_contest_navigation(year, conn)?,
        location: get_contest_location(&contest),
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
            }).collect(),
        medals: ContestInfoMedals {
            gold: get_contest_info_medal(&participations, "G"),
            silver: get_contest_info_medal(&participations, "S"),
            bronze: get_contest_info_medal(&participations, "B"),
        },
    })
}

pub fn get_contest_short_detail_list(conn: &DbConn) -> Result<ContestsInfo, Error> {
    let contests = get_contests(conn)?;
    let participations = get_contests_participations(conn, &contests)?;
    let tasks = Task::belonging_to(&contests)
        .load::<Task>(&**conn)?
        .grouped_by(&contests);

    let mut result: Vec<ContestShortDetail> = Vec::new();
    for (contest, participations, tasks) in izip!(&contests, &participations, &tasks) {
        let num_contestants = zero_is_none(participations.len());
        let score_sum = participations
            .iter()
            .fold(Some(0.0), |sum, part| add_option(sum, part.score));

        result.push(ContestShortDetail {
            year: contest.year,
            location: get_contest_location(&contest),
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
                .map(|t| ContestTaskShortDetail {
                    name: t.name.clone(),
                    title: t.title.clone(),
                    link: t.link.clone(),
                    index: t.index as usize,
                    max_score_possible: t.max_score,
                }).collect(),
            medals: ContestInfoMedals {
                gold: get_contest_info_medal(&participations, "G"),
                silver: get_contest_info_medal(&participations, "S"),
                bronze: get_contest_info_medal(&participations, "B"),
            },
        });
    }
    Ok(ContestsInfo { contests: result })
}

pub fn get_contest_results(year: Year, conn: DbConn) -> Result<ContestResults, Error> {
    schema::contests::table
        .find(year)
        .first::<Contest>(&*conn)?; // check if the contest exists
    let tasks = get_tasks_of_year(&conn, year)?;
    let participations: Vec<(Participation, Option<User>)> =
        get_participations_with_user(&conn, year)?;
    let old_participations: HashMap<String, Vec<Participation>> = get_past_contest_participations(
        &conn,
        participations
            .iter()
            .map(|(p, _u)| p.user_id.clone())
            .collect(),
        year,
    )?;

    let part_from_user_id: HashMap<&str, (&Participation, &Option<User>)> = participations
        .iter()
        .map(|p: &(Participation, Option<User>)| (p.0.user_id.as_str(), (&p.0, &p.1)))
        .collect();

    let mut results: Vec<ContestResult> = Vec::new();
    let empty_vec: Vec<Participation> = vec![];

    for (user_id, scores) in get_contest_task_scores(&conn, year)? {
        let (ref participation, ref user) = match part_from_user_id.get(user_id.as_str()) {
            Some((p, Some(u))) => (p, u),
            _ => return Err(Error::NotFound),
        };

        let scores: Vec<Option<f32>> = scores.iter().map(|s| s.score).collect();
        let old_parts = match old_participations.get(&user_id) {
            Some(v) => v,
            None => &empty_vec,
        }.iter()
        .map(|p| PastParticipation {
            year: p.contest_year,
            medal: medal_from_string(&p.medal),
        }).collect();

        results.push(ContestResult {
            rank: participation.position.map(|p| p as usize),
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

pub fn get_contest_regions(year: Year, conn: DbConn) -> Result<ContestRegions, Error> {
    schema::contests::table
        .find(year)
        .first::<Contest>(&*conn)?; // check if the contest exists

    let mut result: Vec<ContestRegion> = Vec::new();

    for (region, participations) in get_participations_per_regions_per_year(&conn, year)? {
        let sum_score = fold_with_none(Some(0.0), participations.iter(), |m, p| {
            add_option(m, p.score)
        });
        let mut num_medals = get_num_medals(&participations);
        let avg_score = sum_score.map(|sum| sum / (participations.len() as f32));

        result.push(ContestRegion {
            name: region,
            num_participants: zero_is_none(participations.len()),
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

pub fn get_contest_tasks(year: Year, conn: DbConn) -> Result<ContestTasks, Error> {
    schema::contests::table
        .find(year)
        .first::<Contest>(&*conn)?; // check if the contest exists

    let mut result: Vec<ContestTask> = Vec::new();
    for task in get_tasks_of_year(&conn, year)? {
        let scores: Vec<TaskScore> = get_scores_of_task(&conn, year, task.name.as_str())?;
        result.push(get_contest_task(&task, &scores));
    }

    Ok(ContestTasks {
        navigation: get_contest_navigation(year, conn)?,
        tasks: result,
    })
}

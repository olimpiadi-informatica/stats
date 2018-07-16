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
pub struct ContestInfo {
    pub year: i32,
    pub location: Option<String>,
    pub region: Option<String>,
    pub num_contestants: Option<i32>,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
    pub tasks: Vec<String>,
    pub medals: ContestInfoMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Contestant {
    pub id: String,
    pub first_name: String,
    pub last_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PastParticipation {
    pub year: i32,
    pub medal: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestResult {
    pub rank: Option<i32>,
    pub contestant: Contestant,
    pub region: Option<String>,
    pub score: Option<f32>,
    pub scores: Vec<Option<f32>>,
    pub medal: Option<String>,
    pub past_participations: Vec<PastParticipation>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestResults {
    pub tasks: Vec<String>,
    pub results: Vec<ContestResult>,
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

fn get_contests_info(conn: DbConn, year: Option<i32>) -> Result<Vec<ContestInfo>, Error> {
    let contests = match year {
        None => schema::contests::table.load::<Contest>(&*conn),
        Some(year) => schema::contests::table
            .find(year)
            .first::<Contest>(&*conn)
            .map(|c| vec![c]),
    }?;
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
            tasks: tasks.iter().map(|t| t.name.clone()).collect(),
            medals: ContestInfoMedals {
                gold: get_medal_info(&participations, "G"),
                silver: get_medal_info(&participations, "S"),
                bronze: get_medal_info(&participations, "B"),
            },
        });
    }
    Ok(result)
}

pub fn get_contest_results(year: i32, conn: DbConn) -> Result<Json<ContestResults>, Error> {
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
                medal: p.medal.clone(),
            })
            .collect();

        results.push(ContestResult {
            rank: participation.position,
            contestant: Contestant {
                id: user_id,
                first_name: user.name.clone(),
                last_name: user.surname.clone(),
            },
            region: participation.region.clone(),
            score: participation.score,
            scores: scores,
            medal: participation.medal.clone(),
            past_participations: old_parts,
        });
    }

    results.sort_by_key(|r| r.rank);

    Ok(Json(ContestResults {
        tasks: tasks.iter().map(|t| t.name.clone()).collect(),
        results: results,
    }))
}

#[get("/contests")]
pub fn list(conn: DbConn) -> Result<Json<Vec<ContestInfo>>, Failure> {
    match get_contests_info(conn, None) {
        Ok(contests) => Ok(Json(contests)),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>")]
pub fn search(year: i32, conn: DbConn) -> Result<Json<ContestInfo>, Failure> {
    let items = get_contests_info(conn, Some(year));
    match items {
        Ok(mut items) => match items.len() {
            1 => Ok(Json(items.remove(0))),
            _ => Err(error_status(Error::NotFound)),
        },
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/results")]
pub fn results(year: i32, conn: DbConn) -> Result<Json<ContestResults>, Failure> {
    match get_contest_results(year, conn) {
        Ok(res) => Ok(res),
        Err(err) => Err(error_status(err)),
    }
}

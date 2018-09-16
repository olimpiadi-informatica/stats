// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use std::collections::{HashMap, HashSet};
use std::iter::FromIterator;

use controllers::{get_num_medals, NumMedals};
use db::DbConn;
use models::contest::{get_contest_location, get_contests, ContestLocation};
use models::participation::get_participations_per_regions;
use models::task::get_tasks_by_year;
use models::task_score::get_users_task_scores;
use models::user::{contestant_from_user, Contestant};
use schema;
use types::{Contest, Participation, Region, Task, TaskScore, User, Year};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionNavigation {
    pub current: String,
    pub previous: Option<String>,
    pub next: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionShortDetail {
    pub id: String,
    pub name: String,
    pub num_contestants: Option<usize>,
    pub medals: NumMedals,
    pub avg_contestants_per_year: Option<f32>,
    pub hosted: Vec<Year>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionsShortDetail {
    pub regions: Vec<RegionShortDetail>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionDetailYear {
    pub year: Year,
    pub location: ContestLocation,
    pub num_contestants: usize,
    pub num_medals: NumMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionDetail {
    pub name: String,
    pub navigation: RegionNavigation,
    pub years: Vec<RegionDetailYear>,
    pub hosted: Vec<Year>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionContestantTaskScore {
    pub name: String,
    pub score: Option<f32>,
    pub max_score_possible: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionContestantResult {
    pub contestant: Contestant,
    pub rank: Option<usize>,
    pub medal: Option<Medal>,
    pub task_scores: Vec<RegionContestantTaskScore>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionResult {
    pub year: Year,
    pub contestants: Vec<RegionContestantResult>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionResults {
    pub navigation: RegionNavigation,
    pub results: Vec<RegionResult>,
}

pub fn get_region_names(conn: &DbConn) -> Result<Vec<String>, Error> {
    schema::regions::table
        .select(schema::regions::columns::id)
        .order(schema::regions::columns::id)
        .load::<String>(&**conn)
}

pub fn get_contests_by_region(conn: &DbConn) -> Result<Vec<Contest>, Error> {
    schema::contests::table
        .order(schema::contests::columns::region)
        .then_order_by(schema::contests::columns::year)
        .load::<Contest>(&**conn)
}

pub fn get_hosts_per_region(conn: &DbConn) -> Result<HashMap<String, Vec<Contest>>, Error> {
    Ok(get_contests_by_region(conn)?
        .into_iter()
        .group_by(|c| c.region.as_ref().unwrap_or(&"".to_string()).clone())
        .into_iter()
        .map(|(r, c)| (r, c.collect::<Vec<Contest>>()))
        .collect())
}

pub fn get_hosts_of_region(conn: &DbConn, region: &Region) -> Result<Vec<Year>, Error> {
    schema::contests::table
        .filter(schema::contests::columns::region.eq(Some(&region.id)))
        .order(schema::contests::columns::year)
        .select(schema::contests::columns::year)
        .load::<Year>(&**conn)
}

pub fn get_contests_without_full_regions(conn: &DbConn) -> Result<HashSet<Year>, Error> {
    Ok(HashSet::from_iter(
        schema::participations::table
            .filter(schema::participations::columns::region.is_null())
            .select(schema::participations::columns::contest_year)
            .distinct()
            .load::<Year>(&**conn)?
            .iter()
            .cloned(),
    ))
}

pub fn get_participations_per_year_of_region(
    conn: &DbConn,
    region: &Region,
) -> Result<Vec<(Year, Vec<Participation>)>, Error> {
    Ok(schema::participations::table
        .filter(schema::participations::columns::region.eq(Some(&region.id)))
        .order(schema::participations::columns::contest_year)
        .load::<Participation>(&**conn)?
        .into_iter()
        .group_by(|p| p.contest_year)
        .into_iter()
        .map(|p| (p.0, p.1.collect()))
        .into_iter()
        .collect())
}

pub fn get_participations_of_region(
    conn: &DbConn,
    region: &String,
) -> Result<Vec<(Participation, User)>, Error> {
    Ok(schema::participations::table
        .filter(schema::participations::columns::region.eq(region))
        .order(schema::participations::columns::contest_year)
        .left_join(schema::users::table)
        .load::<(Participation, Option<User>)>(&**conn)?
        .into_iter()
        .map(|(p, u)| (p, u.expect("Participation without user")))
        .collect())
}

pub fn get_regions_list(conn: &DbConn) -> Result<RegionsShortDetail, Error> {
    let mut result: Vec<RegionShortDetail> = Vec::new();
    // the avarage number of participations is computed using only the participations
    // from the contests that have all the regions known
    let invalid_contests = get_contests_without_full_regions(&conn)?;
    let contests = get_contests_by_region(&conn)?;
    let hosts: HashMap<String, Vec<Contest>> = get_hosts_per_region(&conn)?;

    for (region, participations) in get_participations_per_regions(&conn)? {
        let num_valid_participations = participations
            .iter()
            .filter(|p| !invalid_contests.contains(&p.contest_year))
            .count();

        result.push(RegionShortDetail {
            id: region.id.clone(),
            name: region.name.clone(),
            num_contestants: zero_is_none(participations.len()),
            medals: get_num_medals(&participations),
            avg_contestants_per_year: zero_is_none(
                (num_valid_participations as f32)
                    / ((contests.len() - invalid_contests.len()) as f32),
            ),
            hosted: hosts
                .get(&region.id)
                .unwrap_or(&vec![])
                .iter()
                .map(|c| c.year)
                .collect(),
        })
    }

    Ok(RegionsShortDetail { regions: result })
}

pub fn get_region_navigation(current: &str, conn: DbConn) -> Result<RegionNavigation, Error> {
    let mut regions = get_region_names(&conn)?;
    let index = regions.iter().position(|r| r.as_str() == current);

    Ok(RegionNavigation {
        current: current.to_string(),
        previous: match index {
            Some(0) => None,
            Some(i) => Some(regions.swap_remove(i - 1)),
            None => None,
        },
        next: match index {
            Some(i) => if i < regions.len() - 1 {
                Some(regions.swap_remove(i + 1))
            } else {
                None
            },
            None => None,
        },
    })
}

pub fn get_region_details(region: String, conn: DbConn) -> Result<RegionDetail, Error> {
    let region = schema::regions::table
        .find(region)
        .first::<Region>(&*conn)?;
    let invalid_contests = get_contests_without_full_regions(&conn)?;

    let participations = get_participations_per_year_of_region(&conn, &region)?;

    let contests: HashMap<Year, Contest> = get_contests(&conn)?
        .into_iter()
        .map(|c| (c.year, c))
        .collect();

    let hosted = get_hosts_of_region(&conn, &region)?;

    Ok(RegionDetail {
        name: region.name.clone(),
        navigation: get_region_navigation(region.id.as_str(), conn)?,
        years: participations
            .iter()
            .filter(|(year, _parts)| !invalid_contests.contains(year))
            .map(|(year, parts)| RegionDetailYear {
                year: *year,
                location: get_contest_location(contests.get(year).expect("Missing contest")),
                num_contestants: parts.len(),
                num_medals: get_num_medals(&parts),
            }).collect(),
        hosted: hosted,
    })
}

pub fn get_region_results(region: String, conn: DbConn) -> Result<RegionResults, Error> {
    let participations = get_participations_of_region(&conn, &region)?;
    let mut contest_years = participations
        .iter()
        .map(|p| p.0.contest_year)
        .collect::<Vec<Year>>();
    contest_years.sort();
    contest_years.dedup();
    let mut user_ids = participations
        .iter()
        .map(|p| p.0.user_id.clone())
        .collect::<Vec<String>>();
    user_ids.sort();
    user_ids.dedup();
    let participations = participations.into_iter().group_by(|p| p.0.contest_year);
    let participations: HashMap<Year, Vec<(Participation, User)>> = participations
        .into_iter()
        .map(|(year, part)| (year, part.collect::<Vec<(Participation, User)>>()))
        .collect();

    let task_scores = get_users_task_scores(&conn, &user_ids)?;
    let task_scores = task_scores.into_iter().group_by(|ts| ts.contest_year);
    let task_scores = task_scores.into_iter().map(|(year, tss)| {
        (
            year,
            tss.collect::<Vec<TaskScore>>()
                .into_iter()
                .group_by(|ts| ts.user_id.clone()),
        )
    });
    let task_scores: HashMap<Year, HashMap<String, Vec<TaskScore>>> = task_scores
        .into_iter()
        .map(|(year, tss)| {
            (
                year,
                HashMap::from_iter(
                    tss.into_iter()
                        .map(|(user_id, tss)| (user_id, tss.collect::<Vec<TaskScore>>())),
                ),
            )
        }).collect();
    let tasks: HashMap<Year, Vec<Task>> = get_tasks_by_year(&conn)?.into_iter().collect();

    let mut result = Vec::new();
    for year in contest_years {
        let participations = participations.get(&year).ok_or(Error::NotFound)?;
        let task_scores = task_scores.get(&year).ok_or(Error::NotFound)?;

        let mut contestants = Vec::new();
        for (p, u) in participations.iter() {
            let scores = task_scores.get(&u.id.clone()).ok_or(Error::NotFound)?;
            contestants.push(RegionContestantResult {
                contestant: contestant_from_user(&u),
                rank: p.position.map(|p| p as usize),
                medal: medal_from_string(&p.medal),
                task_scores: scores
                    .iter()
                    .map(|s| RegionContestantTaskScore {
                        name: s.task_name.clone(),
                        score: s.score,
                        max_score_possible: tasks[&year]
                            .iter()
                            .find(|t| t.name == s.task_name)
                            .expect("TaskScore without task")
                            .max_score,
                    }).collect(),
            });
        }

        result.push(RegionResult {
            year: year,
            contestants: contestants,
        });
    }

    Ok(RegionResults {
        navigation: get_region_navigation(region.as_str(), conn)?,
        results: result,
    })
}

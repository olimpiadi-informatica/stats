// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use rocket::response::Failure;
use rocket_contrib::Json;
use std::collections::{HashMap, HashSet};
use std::iter::FromIterator;

use controllers::{contestant_from_user, get_num_medals, Contestant, NumMedals};
use db::DbConn;
use error_status;
use schema;
use types::{Contest, Participation, Region, TaskScore, User};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionInfo {
    pub id: String,
    pub name: String,
    pub num_contestants: Option<i32>,
    pub medals: NumMedals,
    pub avg_contestants_per_year: Option<f32>,
    pub hosted: Vec<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionsInfo {
    pub regions: Vec<RegionInfo>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestantsPerYear {
    pub year: i32,
    pub num_contestants: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MedalsPerYear {
    pub year: i32,
    pub num_medals: NumMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct DetailedRegion {
    pub id: String,
    pub name: String,
    pub contestants_per_year: Vec<ContestantsPerYear>,
    pub medals_per_year: Vec<MedalsPerYear>,
    pub hosted: Vec<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionContestantTaskScore {
    pub name: String,
    pub score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionContestantResult {
    pub contestant: Contestant,
    pub rank: Option<i32>,
    pub medal: Option<Medal>,
    pub task_scores: Vec<RegionContestantTaskScore>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionResult {
    pub year: i32,
    pub contestants: Vec<RegionContestantResult>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionResults {
    results: Vec<RegionResult>,
}

fn get_contests_without_full_regions(conn: &DbConn) -> Result<HashSet<i32>, Error> {
    Ok(HashSet::from_iter(
        schema::participations::table
            .filter(schema::participations::columns::region.is_null())
            .select(schema::participations::columns::contest_year)
            .distinct()
            .load::<i32>(&**conn)?
            .iter()
            .cloned(),
    ))
}

fn get_regions_list(conn: DbConn) -> Result<RegionsInfo, Error> {
    let mut result: Vec<RegionInfo> = Vec::new();
    // the avarage number of participations is computed using only the participations
    // from the contests that have all the regions known
    let invalid_contests = get_contests_without_full_regions(&conn)?;
    let contests = schema::contests::table
        .order(schema::contests::columns::region)
        .then_order_by(schema::contests::columns::year)
        .load::<Contest>(&*conn)?;
    let hosts: HashMap<String, Vec<&Contest>> = (&contests)
        .into_iter()
        .group_by(|c| c.region.as_ref().unwrap_or(&"".to_string()).clone())
        .into_iter()
        .map(|(r, c)| (r, c.collect::<Vec<&Contest>>()))
        .collect();

    for (region, participations) in schema::participations::table
        .filter(schema::participations::region.is_not_null())
        .left_join(schema::regions::table)
        .order(schema::participations::region)
        .load::<(Participation, Option<Region>)>(&*conn)?
        .iter()
        .group_by(|(_p, r)| r)
        .into_iter()
        // FIXME the .clone() here may be removed somehow
        .map(|(r, p)| (r, p.map(|p| p.0.clone()).collect::<Vec<Participation>>()))
        .into_iter()
    {
        let region = region.as_ref().ok_or(Error::NotFound)?;
        let num_valid_participations = participations
            .iter()
            .filter(|p| !invalid_contests.contains(&p.contest_year))
            .count();

        result.push(RegionInfo {
            id: region.id.clone(),
            name: region.name.clone(),
            num_contestants: zero_is_none(participations.len() as i32),
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

    Ok(RegionsInfo { regions: result })
}

fn get_region_details(region: String, conn: DbConn) -> Result<DetailedRegion, Error> {
    let region = schema::regions::table.find(region).first::<Region>(&*conn)?;
    let invalid_contests = get_contests_without_full_regions(&conn)?;

    let participations: Vec<(i32, Vec<Participation>)> = schema::participations::table
        .filter(schema::participations::columns::region.eq(Some(&region.id)))
        .order(schema::participations::columns::contest_year)
        .load::<Participation>(&*conn)?
        .into_iter()
        .group_by(|p| p.contest_year)
        .into_iter()
        .map(|p| (p.0, p.1.collect()))
        .into_iter()
        .collect();
    let contestants_per_year = (&participations)
        .iter()
        .filter(|(year, _parts)| !invalid_contests.contains(year))
        .map(|(year, parts)| ContestantsPerYear {
            year: *year,
            num_contestants: (parts.len() as i32),
        })
        .collect();
    let medals_per_year = (&participations)
        .iter()
        .filter(|(year, _parts)| !invalid_contests.contains(year))
        .map(|(year, parts)| MedalsPerYear {
            year: *year,
            num_medals: get_num_medals(&parts),
        })
        .collect();
    let hosted = schema::contests::table
        .filter(schema::contests::columns::region.eq(Some(&region.id)))
        .order(schema::contests::columns::year)
        .select(schema::contests::columns::year)
        .load::<i32>(&*conn)?;

    Ok(DetailedRegion {
        id: region.id.clone(),
        name: region.name.clone(),
        contestants_per_year: contestants_per_year,
        medals_per_year: medals_per_year,
        hosted: hosted,
    })
}

fn get_region_results(region: String, conn: DbConn) -> Result<RegionResults, Error> {
    let participations = schema::participations::table
        .filter(schema::participations::columns::region.eq(region))
        .order(schema::participations::columns::contest_year)
        .left_join(schema::users::table)
        .load::<(Participation, Option<User>)>(&*conn)?;
    let mut contest_years = participations
        .iter()
        .map(|p| p.0.contest_year)
        .collect::<Vec<i32>>();
    contest_years.sort();
    contest_years.dedup();
    let mut user_ids = participations
        .iter()
        .map(|p| p.0.user_id.clone())
        .collect::<Vec<String>>();
    user_ids.sort();
    user_ids.dedup();
    let participations = participations.into_iter().group_by(|p| p.0.contest_year);
    let participations: HashMap<i32, Vec<(Participation, Option<User>)>> = participations
        .into_iter()
        .map(|(year, part)| (year, part.collect::<Vec<(Participation, Option<User>)>>()))
        .collect();

    let task_scores = schema::task_scores::table
        .filter(schema::task_scores::columns::user_id.eq_any(user_ids))
        .order(schema::task_scores::columns::contest_year)
        .then_order_by(schema::task_scores::columns::user_id)
        .load::<TaskScore>(&*conn)?;
    let task_scores = task_scores.into_iter().group_by(|ts| ts.contest_year);
    let task_scores = task_scores.into_iter().map(|(year, tss)| {
        (
            year,
            tss.collect::<Vec<TaskScore>>()
                .into_iter()
                .group_by(|ts| ts.user_id.clone()),
        )
    });
    let task_scores: HashMap<i32, HashMap<String, Vec<TaskScore>>> = task_scores
        .into_iter()
        .map(|(year, tss)| {
            (
                year,
                HashMap::from_iter(
                    tss.into_iter()
                        .map(|(user_id, tss)| (user_id, tss.collect::<Vec<TaskScore>>())),
                ),
            )
        })
        .collect();

    let mut result = Vec::new();
    for year in contest_years {
        let participations = participations.get(&year).ok_or(Error::NotFound)?;
        let task_scores = task_scores.get(&year).ok_or(Error::NotFound)?;

        let mut contestants = Vec::new();
        for (p, u) in participations.iter() {
            let u = u.as_ref().ok_or(Error::NotFound)?;
            let scores = task_scores.get(&u.id.clone()).ok_or(Error::NotFound)?;
            contestants.push(RegionContestantResult {
                contestant: contestant_from_user(&u),
                rank: p.position,
                medal: medal_from_string(&p.medal),
                task_scores: scores
                    .iter()
                    .map(|s| RegionContestantTaskScore {
                        name: s.task_name.clone(),
                        score: s.score,
                    })
                    .collect(),
            });
        }

        result.push(RegionResult {
            year: year,
            contestants: contestants,
        });
    }

    Ok(RegionResults { results: result })
}

#[get("/regions")]
pub fn list(conn: DbConn) -> Result<Json<RegionsInfo>, Failure> {
    match get_regions_list(conn) {
        Ok(regions) => Ok(Json(regions)),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/regions/<region>")]
pub fn search(region: String, conn: DbConn) -> Result<Json<DetailedRegion>, Failure> {
    match get_region_details(region, conn) {
        Ok(region) => Ok(Json(region)),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/regions/<region>/results")]
pub fn results(region: String, conn: DbConn) -> Result<Json<RegionResults>, Failure> {
    match get_region_results(region, conn) {
        Ok(results) => Ok(Json(results)),
        Err(err) => Err(error_status(err)),
    }
}

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Float, Integer, Nullable, Text};

use db::DbConn;
use models::contest::ContestLocation;
use schema;
use types::Year;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum ContestStat {
    ContestWithMostParticipants(ContestWithMostParticipants),
    ContestWithMostExAequo(ContestWithMostExAequo),
    MostNorthernContest(MostNorthernContest),
    MostSouthernContest(MostSouthernContest),
    ContestWithMostGirls(ContestWithMostGirls),
    NumBoysGirls(NumBoysGirls),
    NumParticipantsPerYear(NumParticipantsPerYear),
    MostUsedLocation(MostUsedLocation),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestWithMostParticipants {
    year: Year,
    num_participants: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestWithMostExAequo {
    year: Year,
    num_ex_aequo: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MostNorthernContest {
    year: Year,
    location: ContestLocation,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MostSouthernContest {
    year: Year,
    location: ContestLocation,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestWithMostGirls {
    year: Year,
    num_girls: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SingleContestNumBoysGirls {
    year: Year,
    num_boys: usize,
    num_girls: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NumBoysGirls {
    years: Vec<SingleContestNumBoysGirls>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SingleContestNumParticipants {
    year: Year,
    num_participants: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NumParticipantsPerYear {
    years: Vec<SingleContestNumParticipants>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MostUsedLocation {
    location: ContestLocation,
    years: Vec<Year>,
}

fn get_contest_with_most_participants(
    conn: &DbConn,
    results: &mut Vec<ContestStat>,
) -> Result<(), Error> {
    let query = "SELECT
        contest_year, COUNT(*) AS num
        FROM participations
        GROUP BY contest_year
        ORDER BY num DESC
        LIMIT 2";
    let contests: Vec<(i32, i32)> = sql::<(Integer, Integer)>(query).load(&**conn)?;
    if contests.len() != 2 {
        return Ok(());
    }
    let first = &contests[0];
    let second = &contests[1];
    if first.1 == second.1 {
        return Ok(());
    }
    results.push(ContestStat::ContestWithMostParticipants(
        ContestWithMostParticipants {
            year: first.0,
            num_participants: first.1 as usize,
        },
    ));
    Ok(())
}

fn get_contest_with_most_ex_aequo(
    conn: &DbConn,
    results: &mut Vec<ContestStat>,
) -> Result<(), Error> {
    let query = "SELECT
        contest_year, COUNT(*) AS num
        FROM participations AS p
        WHERE score = (
            SELECT MAX(score)
            FROM participations
            WHERE participations.contest_year = p.contest_year
        )
        GROUP BY contest_year
        ORDER BY num DESC
        LIMIT 2";
    let contests: Vec<(i32, i32)> = sql::<(Integer, Integer)>(query).load(&**conn)?;
    if contests.len() != 2 {
        return Ok(());
    }
    let first = &contests[0];
    let second = &contests[1];
    if first.1 == second.1 {
        return Ok(());
    }
    results.push(ContestStat::ContestWithMostExAequo(
        ContestWithMostExAequo {
            year: first.0,
            num_ex_aequo: first.1 as usize,
        },
    ));
    Ok(())
}

fn get_most_northern_contest(conn: &DbConn, results: &mut Vec<ContestStat>) -> Result<(), Error> {
    let query = "SELECT
        year, location, gmaps, latitude, longitude
        FROM contests
        WHERE latitude IS NOT NULL
        ORDER BY latitude DESC
        LIMIT 2";
    let contests: Vec<(
        i32,
        Option<String>,
        Option<String>,
        Option<f32>,
        Option<f32>,
    )> = sql::<(
        Integer,
        Nullable<Text>,
        Nullable<Text>,
        Nullable<Float>,
        Nullable<Float>,
    )>(query)
    .load(&**conn)?;
    if contests.len() != 2 {
        return Ok(());
    }
    let first = &contests[0];
    let second = &contests[1];
    if first.3 == second.3 {
        return Ok(());
    }
    results.push(ContestStat::MostNorthernContest(MostNorthernContest {
        year: first.0,
        location: ContestLocation {
            location: first.1.clone(),
            gmaps: first.2.clone(),
            latitude: first.3,
            longitude: first.4,
        },
    }));
    Ok(())
}

fn get_most_southern_contest(conn: &DbConn, results: &mut Vec<ContestStat>) -> Result<(), Error> {
    let query = "SELECT
        year, location, gmaps, latitude, longitude
        FROM contests
        WHERE latitude IS NOT NULL
        ORDER BY latitude
        LIMIT 2";
    let contests: Vec<(
        i32,
        Option<String>,
        Option<String>,
        Option<f32>,
        Option<f32>,
    )> = sql::<(
        Integer,
        Nullable<Text>,
        Nullable<Text>,
        Nullable<Float>,
        Nullable<Float>,
    )>(query)
    .load(&**conn)?;
    if contests.len() != 2 {
        return Ok(());
    }
    let first = &contests[0];
    let second = &contests[1];
    if first.3 == second.3 {
        return Ok(());
    }
    results.push(ContestStat::MostSouthernContest(MostSouthernContest {
        year: first.0,
        location: ContestLocation {
            location: first.1.clone(),
            gmaps: first.2.clone(),
            latitude: first.3,
            longitude: first.4,
        },
    }));
    Ok(())
}

fn get_contest_with_most_girls(conn: &DbConn, results: &mut Vec<ContestStat>) -> Result<(), Error> {
    let query = "SELECT
        contest_year, COUNT(*) AS num
        FROM participations
        JOIN users ON id = user_id
        WHERE gender = 'F'
        GROUP BY contest_year
        ORDER BY num DESC
        LIMIT 2";
    let contests: Vec<(i32, i32)> = sql::<(Integer, Integer)>(query).load(&**conn)?;
    if contests.len() != 2 {
        return Ok(());
    }
    let first = &contests[0];
    let second = &contests[1];
    if first.1 == second.1 {
        return Ok(());
    }
    results.push(ContestStat::ContestWithMostGirls(ContestWithMostGirls {
        year: first.0,
        num_girls: first.1 as usize,
    }));
    Ok(())
}

fn get_num_boys_girls(conn: &DbConn, results: &mut Vec<ContestStat>) -> Result<(), Error> {
    let query = "SELECT
    	year,
    	(SELECT COUNT(*) FROM participations JOIN users ON user_id = id WHERE contest_year = year AND gender = 'M'),
    	(SELECT COUNT(*) FROM participations JOIN users ON user_id = id WHERE contest_year = year AND gender = 'F')
        FROM contests;";
    let contests: Vec<(i32, i32, i32)> = sql::<(Integer, Integer, Integer)>(query).load(&**conn)?;
    results.push(ContestStat::NumBoysGirls(NumBoysGirls {
        years: contests
            .into_iter()
            .map(|c| SingleContestNumBoysGirls {
                year: c.0,
                num_boys: c.1 as usize,
                num_girls: c.2 as usize,
            })
            .collect(),
    }));
    Ok(())
}

fn get_num_participants_per_year(
    conn: &DbConn,
    results: &mut Vec<ContestStat>,
) -> Result<(), Error> {
    let query = "SELECT
    	year,
    	(SELECT COUNT(*) FROM participations JOIN users ON user_id = id WHERE contest_year = year)
        FROM contests;";
    let contests: Vec<(i32, i32)> = sql::<(Integer, Integer)>(query).load(&**conn)?;
    results.push(ContestStat::NumParticipantsPerYear(
        NumParticipantsPerYear {
            years: contests
                .into_iter()
                .map(|c| SingleContestNumParticipants {
                    year: c.0,
                    num_participants: c.1 as usize,
                })
                .collect(),
        },
    ));
    Ok(())
}

fn get_most_used_location(conn: &DbConn, results: &mut Vec<ContestStat>) -> Result<(), Error> {
    let query = "SELECT
        location, gmaps, latitude, longitude, COUNT(*) AS num
        FROM contests
        GROUP BY latitude, longitude
        ORDER BY num DESC
        LIMIT 2";
    let contests: Vec<(
        Option<String>,
        Option<String>,
        Option<f32>,
        Option<f32>,
        i32,
    )> = sql::<(
        Nullable<Text>,
        Nullable<Text>,
        Nullable<Float>,
        Nullable<Float>,
        Integer,
    )>(query)
    .load(&**conn)?;
    if contests.len() != 2 {
        return Ok(());
    }
    let first = &contests[0];
    let second = &contests[1];
    if first.4 == second.4 {
        return Ok(());
    }
    let years: Vec<Year> = schema::contests::table
        .filter(schema::contests::columns::gmaps.eq(&first.1))
        .select(schema::contests::columns::year)
        .load(&**conn)?;
    results.push(ContestStat::MostUsedLocation(MostUsedLocation {
        location: ContestLocation {
            location: first.0.clone(),
            gmaps: first.1.clone(),
            latitude: first.2,
            longitude: first.3,
        },
        years: years,
    }));
    Ok(())
}

pub fn get_contest_stats(conn: &DbConn) -> Result<Vec<ContestStat>, Error> {
    let mut results: Vec<ContestStat> = vec![];
    get_contest_with_most_participants(conn, &mut results)?;
    get_contest_with_most_ex_aequo(conn, &mut results)?;
    get_most_northern_contest(conn, &mut results)?;
    get_most_southern_contest(conn, &mut results)?;
    get_contest_with_most_girls(conn, &mut results)?;
    get_num_boys_girls(conn, &mut results)?;
    get_num_participants_per_year(conn, &mut results)?;
    get_most_used_location(conn, &mut results)?;
    Ok(results)
}

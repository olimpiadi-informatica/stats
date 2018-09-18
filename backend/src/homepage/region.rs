// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Float, Integer, Text};

use controllers::NumMedals;
use db::DbConn;
use homepage::HomepageStat;

#[derive(Serialize, Deserialize, Debug)]
struct SingleRegionWithMedals {
    pub id: String,
    pub name: String,
    pub num_medals: NumMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionWithMostMedals {
    first: SingleRegionWithMedals,
    second: SingleRegionWithMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionWithMostMedalsPerParticipant {
    id: String,
    name: String,
    medals_per_participant: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionWithMostFirstPlaces {
    id: String,
    name: String,
    num_first_places: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegionWithMostParticipants {
    id: String,
    name: String,
    num_participants: usize,
}

fn get_region_with_most_medals(
    conn: &DbConn,
    results: &mut Vec<HomepageStat>,
) -> Result<(), Error> {
    let query = "SELECT
            id, name,
            (SELECT COUNT (*) FROM participations WHERE region = id AND medal = 'G') AS gold,
            (SELECT COUNT (*) FROM participations WHERE region = id AND medal = 'S') AS silver,
            (SELECT COUNT (*) FROM participations WHERE region = id AND medal = 'B') AS bronze
            FROM regions
            ORDER BY gold DESC, silver DESC, bronze DESC
            LIMIT 2;";
    let regions: Vec<(String, String, i32, i32, i32)> =
        sql::<(Text, Text, Integer, Integer, Integer)>(query).load(&**conn)?;
    if regions.len() != 2 {
        return Ok(());
    }
    let first = &regions[0];
    let second = &regions[1];
    results.push(HomepageStat::RegionWithMostMedals(RegionWithMostMedals {
        first: SingleRegionWithMedals {
            id: first.0.clone(),
            name: first.1.clone(),
            num_medals: NumMedals {
                gold: Some(first.2 as usize),
                silver: Some(first.3 as usize),
                bronze: Some(first.4 as usize),
            },
        },
        second: SingleRegionWithMedals {
            id: second.0.clone(),
            name: second.1.clone(),
            num_medals: NumMedals {
                gold: Some(second.2 as usize),
                silver: Some(second.3 as usize),
                bronze: Some(second.4 as usize),
            },
        },
    }));
    Ok(())
}

fn get_region_with_most_medals_per_participant(
    conn: &DbConn,
    results: &mut Vec<HomepageStat>,
) -> Result<(), Error> {
    let query = "SELECT
            id, name,
            (
                (SELECT COUNT (*) FROM participations WHERE region = id AND medal = 'G') +
                (SELECT COUNT (*) FROM participations WHERE region = id AND medal = 'S') +
                (SELECT COUNT (*) FROM participations WHERE region = id AND medal = 'B')
            ) * 1.0 / (SELECT COUNT (*) FROM participations WHERE region = id) AS ratio
            FROM regions
            ORDER BY ratio DESC
            LIMIT 1;";
    let regions: Vec<(String, String, f32)> = sql::<(Text, Text, Float)>(query).load(&**conn)?;
    if regions.len() != 1 {
        return Ok(());
    }
    let region = &regions[0];
    results.push(HomepageStat::RegionWithMostMedalsPerParticipant(
        RegionWithMostMedalsPerParticipant {
            id: region.0.clone(),
            name: region.1.clone(),
            medals_per_participant: region.2,
        },
    ));
    Ok(())
}

fn get_region_with_most_first_places(
    conn: &DbConn,
    results: &mut Vec<HomepageStat>,
) -> Result<(), Error> {
    let query = "SELECT
            id, name,
                (SELECT COUNT (*) FROM participations WHERE region = id AND position = 1) AS num
            FROM regions
            ORDER BY num DESC
            LIMIT 2;";
    let regions: Vec<(String, String, i32)> = sql::<(Text, Text, Integer)>(query).load(&**conn)?;
    if regions.len() != 2 {
        return Ok(());
    }
    // if there is not an absolute winner
    if regions[0].2 == regions[1].2 {
        return Ok(());
    }
    let region = &regions[0];
    results.push(HomepageStat::RegionWithMostFirstPlaces(
        RegionWithMostFirstPlaces {
            id: region.0.clone(),
            name: region.1.clone(),
            num_first_places: region.2 as usize,
        },
    ));
    Ok(())
}

fn get_region_with_most_participants(
    conn: &DbConn,
    results: &mut Vec<HomepageStat>,
) -> Result<(), Error> {
    let query = "SELECT
            id, name,
                (SELECT COUNT (*) FROM participations WHERE region = id) AS num
            FROM regions
            ORDER BY num DESC
            LIMIT 2;";
    let regions: Vec<(String, String, i32)> = sql::<(Text, Text, Integer)>(query).load(&**conn)?;
    if regions.len() != 2 {
        return Ok(());
    }
    // if there is not an absolute winner
    if regions[0].2 == regions[1].2 {
        return Ok(());
    }
    let region = &regions[0];
    results.push(HomepageStat::RegionWithMostParticipants(
        RegionWithMostParticipants {
            id: region.0.clone(),
            name: region.1.clone(),
            num_participants: region.2 as usize,
        },
    ));
    Ok(())
}

pub fn get_region_stats(conn: &DbConn, results: &mut Vec<HomepageStat>) -> Result<(), Error> {
    get_region_with_most_medals(conn, results)?;
    get_region_with_most_medals_per_participant(conn, results)?;
    get_region_with_most_first_places(conn, results)?;
    get_region_with_most_participants(conn, results)?;
    Ok(())
}

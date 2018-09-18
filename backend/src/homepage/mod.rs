// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

mod region;

use db::DbConn;
use diesel::result::Error;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum HomepageStat {
    RegionWithMostMedals(region::RegionWithMostMedals),
    RegionWithMostMedalsPerParticipant(region::RegionWithMostMedalsPerParticipant),
    RegionWithMostFirstPlaces(region::RegionWithMostFirstPlaces),
    RegionWithMostParticipants(region::RegionWithMostParticipants),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct HomepageStats {
    results: Vec<HomepageStat>,
}

pub fn get_homepage_stats(conn: &DbConn) -> Result<HomepageStats, Error> {
    let mut results: Vec<HomepageStat> = vec![];
    region::get_region_stats(conn, &mut results)?;
    Ok(HomepageStats { results: results })
}

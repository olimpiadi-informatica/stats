// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

mod contest;
mod region;
mod task;
mod user;

use diesel::result::Error;

use crate::db::DbConn;

#[derive(Serialize, Deserialize, Debug)]
pub struct HomepageStats {
    region: Vec<region::RegionStat>,
    user: Vec<user::UserStat>,
    task: Vec<task::TaskStat>,
    contest: Vec<contest::ContestStat>,
}

pub fn get_homepage_stats(conn: &DbConn) -> Result<HomepageStats, Error> {
    Ok(HomepageStats {
        region: region::get_region_stats(conn)?,
        user: user::get_user_stats(conn)?,
        task: task::get_task_stats(conn)?,
        contest: contest::get_contest_stats(conn)?,
    })
}

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use itertools::Itertools;

use db::DbConn;
use schema;
use types::{TaskScore, Year};

pub fn get_contest_task_scores(
    conn: &DbConn,
    year: Year,
) -> Result<Vec<(String, Vec<TaskScore>)>, Error> {
    Ok(schema::task_scores::table
        .filter(schema::task_scores::columns::contest_year.eq(year))
        .order(schema::task_scores::columns::user_id.asc())
        .load::<TaskScore>(&**conn)?
        .into_iter()
        .group_by(|t| t.user_id.clone())
        .into_iter()
        .map(|(id, scores)| (id, scores.collect()))
        .collect())
}

pub fn get_task_scores(conn: &DbConn, year: Year, name: &str) -> Result<Vec<TaskScore>, Error> {
    schema::task_scores::table
        .filter(
            schema::task_scores::columns::contest_year
                .eq(year)
                .and(schema::task_scores::columns::task_name.eq(name)),
        )
        .load(&**conn)
}

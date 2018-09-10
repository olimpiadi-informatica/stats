// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use std::collections::HashMap;

use db::DbConn;
use schema;
use types::{Task, TaskScore, Year};

pub fn get_tasks(conn: &DbConn, year: Year) -> Result<Vec<Task>, Error> {
    return schema::tasks::table
        .filter(schema::tasks::columns::contest_year.eq(year))
        .load::<Task>(&**conn);
}

pub fn get_scores_of_year(
    conn: &DbConn,
    year: Year,
) -> Result<HashMap<String, Vec<TaskScore>>, Error> {
    Ok(schema::task_scores::table
        .filter(schema::task_scores::columns::contest_year.eq(year))
        .order(schema::task_scores::columns::task_name)
        .load::<TaskScore>(&**conn)?
        .into_iter()
        .group_by(|ts| ts.task_name.clone())
        .into_iter()
        .map(|p| (p.0.clone(), p.1.collect()))
        .collect())
}

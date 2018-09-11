// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use itertools::Itertools;

use db::DbConn;
use schema;
use types::{TaskScore, User, Year};

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

pub fn get_scores_of_task(conn: &DbConn, year: Year, name: &str) -> Result<Vec<TaskScore>, Error> {
    schema::task_scores::table
        .filter(
            schema::task_scores::columns::contest_year
                .eq(year)
                .and(schema::task_scores::columns::task_name.eq(name)),
        )
        .load(&**conn)
}

pub fn get_scores_of_task_with_user(
    conn: &DbConn,
    year: Year,
    task_name: &String,
) -> Result<Vec<(TaskScore, User)>, Error> {
    Ok(schema::task_scores::table
        .filter(
            schema::task_scores::columns::contest_year
                .eq(year)
                .and(schema::task_scores::columns::task_name.eq(task_name)),
        )
        .order(schema::task_scores::columns::user_id)
        .left_join(schema::users::table)
        .load::<(TaskScore, Option<User>)>(&**conn)?
        .into_iter()
        .map(|(ts, u)| (ts, u.expect("User not found")))
        .collect())
}

pub fn get_users_task_scores(
    conn: &DbConn,
    user_ids: &Vec<String>,
) -> Result<Vec<TaskScore>, Error> {
    schema::task_scores::table
        .filter(schema::task_scores::columns::user_id.eq_any(user_ids))
        .order(schema::task_scores::columns::contest_year)
        .then_order_by(schema::task_scores::columns::user_id)
        .load::<TaskScore>(&**conn)
}

pub fn get_user_task_scores(
    conn: &DbConn,
    user_id: &String,
) -> Result<Vec<(Year, Vec<TaskScore>)>, Error> {
    Ok(schema::task_scores::table
        .filter(schema::task_scores::columns::user_id.eq(&user_id))
        .order(schema::task_scores::columns::contest_year)
        .load::<TaskScore>(&**conn)?
        .into_iter()
        .group_by(|ts| ts.contest_year)
        .into_iter()
        .map(|(year, scores)| (year, scores.collect::<Vec<TaskScore>>()))
        .collect())
}

pub fn get_task_scores(conn: &DbConn) -> Result<Vec<TaskScore>, Error> {
    schema::task_scores::table
        .order(schema::task_scores::columns::contest_year)
        .then_order_by(schema::task_scores::columns::task_name)
        .load::<TaskScore>(&**conn)
}

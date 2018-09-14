// License, v. 2.0. If a copy of the MPL was not distributed with this
// This Source Code Form is subject to the terms of the Mozilla Public
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use std::collections::HashMap;

use db::DbConn;
use schema;

use types::{Contest, Participation, Region, User, Year};
use utility::Medal;

#[derive(Serialize, Deserialize, Debug)]
pub struct PastParticipation {
    pub year: Year,
    pub medal: Option<Medal>,
}

pub fn get_participations(conn: &DbConn, year: Year) -> Result<Vec<Participation>, Error> {
    return schema::participations::table
        .filter(schema::participations::columns::contest_year.eq(year))
        .order(schema::participations::columns::user_id)
        .load::<Participation>(&**conn);
}

pub fn get_contests_participations(
    conn: &DbConn,
    contests: &Vec<Contest>,
) -> Result<Vec<Vec<Participation>>, Error> {
    Ok(Participation::belonging_to(contests)
        .load::<Participation>(&**conn)?
        .grouped_by(&contests))
}

pub fn get_users_participations(
    conn: &DbConn,
    users: &Vec<User>,
) -> Result<Vec<Vec<Participation>>, Error> {
    Ok(Participation::belonging_to(users)
        .order(schema::participations::columns::contest_year.desc())
        .load::<Participation>(&**conn)?
        .grouped_by(&users))
}

pub fn get_user_participations(
    conn: &DbConn,
    user_id: &String,
) -> Result<Vec<Participation>, Error> {
    schema::participations::table
        .filter(schema::participations::columns::user_id.eq(user_id))
        .order(schema::participations::columns::contest_year.desc())
        .load::<Participation>(&**conn)
}

pub fn get_participations_with_user(
    conn: &DbConn,
    year: Year,
) -> Result<Vec<(Participation, Option<User>)>, Error> {
    schema::participations::table
        .filter(schema::participations::columns::contest_year.eq(year))
        .left_join(schema::users::table)
        .load(&**conn)
}

pub fn get_past_contest_participations(
    conn: &DbConn,
    user_ids: Vec<String>,
    year: Year,
) -> Result<HashMap<String, Vec<Participation>>, Error> {
    Ok(schema::participations::table
        .filter(
            schema::participations::columns::user_id
                .eq_any(user_ids)
                .and(schema::participations::columns::contest_year.lt(year)),
        ).order(schema::participations::columns::user_id)
        .then_order_by(schema::participations::columns::contest_year.desc())
        .load::<Participation>(&**conn)?
        .into_iter()
        .group_by(|p| p.user_id.clone())
        .into_iter()
        .map(|p| (p.0.clone(), p.1.collect()))
        .collect())
}

pub fn get_participations_per_regions_per_year(
    conn: &DbConn,
    year: Year,
) -> Result<Vec<(String, Vec<Participation>)>, Error> {
    Ok(schema::participations::table
        .filter(
            schema::participations::contest_year
                .eq(year)
                .and(schema::participations::region.is_not_null()),
        ).order(schema::participations::region)
        .load::<Participation>(&**conn)?
        .into_iter()
        .group_by(|p| p.region.clone())
        .into_iter()
        .map(|(r, p)| {
            (
                r.expect("The filter hasn't worked well"),
                p.collect::<Vec<Participation>>(),
            )
        }).collect())
}

pub fn get_participations_per_regions(
    conn: &DbConn,
) -> Result<Vec<(Region, Vec<Participation>)>, Error> {
    Ok(schema::participations::table
        .filter(schema::participations::region.is_not_null())
        .left_join(schema::regions::table)
        .order(schema::participations::region)
        .load::<(Participation, Option<Region>)>(&**conn)?
        .iter()
        .group_by(|(_p, r)| r)
        .into_iter()
        // FIXME the .clone() here may be removed somehow
        .map(|(r, p)| {
            (
                (*r).clone().expect("Join didn't worked"),
                p.map(|p| p.0.clone()).collect::<Vec<Participation>>(),
            )
        }).into_iter()
        .collect())
}

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use std::collections::HashMap;
use std::usize;

use crate::controllers::{get_num_medals, NumMedals};
use crate::db::DbConn;
use crate::models::participation::{get_user_participations, get_users_participations};
use crate::models::task::get_tasks_by_year;
use crate::models::task_score::get_user_task_scores;
use crate::schema;
use crate::types::{Task, User, Year};
use crate::utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct Contestant {
    pub id: String,
    pub first_name: Option<String>,
    pub last_name: String,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct UserInfoParticipation {
    pub year: Year,
    pub ioi: bool,
    pub medal: Option<Medal>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserInfo {
    pub contestant: Contestant,
    pub num_medals: NumMedals,
    pub best_rank: Option<usize>,
    pub participations: Vec<UserInfoParticipation>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserList {
    pub users: Vec<UserInfo>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDetailScore {
    pub task: String,
    pub score: Option<f32>,
    pub max_score_possible: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDetailParticipation {
    pub year: Year,
    pub ioi: bool,
    pub medal: Option<Medal>,
    pub rank: Option<usize>,
    pub region: Option<String>,
    pub scores: Vec<UserDetailScore>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDetail {
    contestant: Contestant,
    participations: Vec<UserDetailParticipation>,
}

pub fn contestant_from_user(user: &User) -> Contestant {
    Contestant {
        id: user.id.clone(),
        first_name: user.name.clone(),
        last_name: user.surname.clone(),
    }
}

pub fn get_users(conn: &DbConn) -> Result<Vec<User>, Error> {
    schema::users::table.load::<User>(&**conn)
}

pub fn get_users_from_id(conn: &DbConn, ids: &[String]) -> Result<Vec<User>, Error> {
    schema::users::table
        .filter(schema::users::columns::id.eq_any(ids))
        .load::<User>(&**conn)
}

pub fn get_users_list(conn: &DbConn, users: &[User]) -> Result<UserList, Error> {
    let participations = get_users_participations(conn, users)?;
    let mut result: Vec<UserInfo> = Vec::new();
    for (user, participations) in izip!(users, participations) {
        result.push(UserInfo {
            contestant: contestant_from_user(&user),
            num_medals: get_num_medals(&participations),
            best_rank: fold_with_none(Some(usize::MAX), participations.iter(), |b, p| {
                min_option(b, p.position.map(|p| p as usize))
            }),
            participations: participations
                .iter()
                .map(|p| UserInfoParticipation {
                    year: p.contest_year,
                    ioi: p.IOI.unwrap_or(false),
                    medal: medal_from_string(&p.medal),
                })
                .collect(),
        });
    }
    Ok(UserList { users: result })
}

pub fn get_all_users_list(conn: DbConn) -> Result<UserList, Error> {
    let users = get_users(&conn)?;
    let mut users = get_users_list(&conn, &users)?;
    users.users.sort_unstable_by_key(|u| u.num_medals);
    users.users.reverse();
    Ok(users)
}

pub fn get_user_detail(user_id: String, conn: DbConn) -> Result<UserDetail, Error> {
    let user = schema::users::table.find(&user_id).first::<User>(&*conn)?;
    let participations = get_user_participations(&conn, &user_id)?;
    let scores = get_user_task_scores(&conn, &user_id)?;
    let tasks: HashMap<Year, Vec<Task>> = get_tasks_by_year(&conn)?.into_iter().collect();
    let mut result: Vec<UserDetailParticipation> = Vec::new();
    for (participation, (year, scores)) in izip!(participations, scores) {
        if participation.contest_year != year {
            return Err(Error::NotFound);
        }
        result.push(UserDetailParticipation {
            year,
            ioi: participation.IOI.unwrap_or(false),
            medal: medal_from_string(&participation.medal),
            rank: participation.position.map(|p| p as usize),
            region: participation.region,
            scores: scores
                .iter()
                .map(|s| UserDetailScore {
                    task: s.task_name.clone(),
                    score: s.score,
                    max_score_possible: tasks[&year]
                        .iter()
                        .find(|t| t.name == s.task_name)
                        .expect("TaskScore without task")
                        .max_score,
                })
                .collect(),
        });
    }
    result.sort_unstable_by_key(|c| -c.year);
    Ok(UserDetail {
        contestant: contestant_from_user(&user),
        participations: result,
    })
}

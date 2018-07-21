use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use rocket::response::Failure;
use rocket_contrib::Json;
use std::i32;

use controllers::{contestant_from_user, get_num_medals, Contestant, NumMedals};
use db::DbConn;
use error_status;
use schema;
use types::{Participation, TaskScore, User};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct UserInfoParticipation {
    pub year: i32,
    pub medal: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserInfo {
    pub contestant: Contestant,
    pub num_medals: NumMedals,
    pub best_rank: Option<i32>,
    pub participations: Vec<UserInfoParticipation>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Users {
    pub users: Vec<UserInfo>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDetailScore {
    pub task: String,
    pub score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDetailParticipation {
    pub year: i32,
    pub medal: Option<String>,
    pub rank: Option<i32>,
    pub scores: Vec<UserDetailScore>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserDetail {
    contestant: Contestant,
    participations: Vec<UserDetailParticipation>,
}

fn get_users_list(conn: DbConn) -> Result<Users, Error> {
    let users = schema::users::table.load::<User>(&*conn)?;
    let participations = Participation::belonging_to(&users)
        .order(schema::participations::columns::contest_year.desc())
        .load::<Participation>(&*conn)?
        .grouped_by(&users);
    let mut result: Vec<UserInfo> = Vec::new();
    for (user, participations) in izip!(users, participations) {
        result.push(UserInfo {
            contestant: contestant_from_user(&user),
            num_medals: get_num_medals(&participations),
            best_rank: fold_with_none(Some(i32::MAX), participations.iter(), |b, p| {
                min_option(b, p.position)
            }),
            participations: participations
                .iter()
                .map(|p| UserInfoParticipation {
                    year: p.contest_year,
                    medal: p.medal.clone(),
                })
                .collect(),
        });
    }
    Ok(Users { users: result })
}

fn get_user_detail(user_id: String, conn: DbConn) -> Result<UserDetail, Error> {
    let user = schema::users::table.find(&user_id).first::<User>(&*conn)?;
    let participations = schema::participations::table
        .filter(schema::participations::columns::user_id.eq(&user_id))
        .order(schema::participations::columns::contest_year)
        .load::<Participation>(&*conn)?;
    let scores = schema::task_scores::table
        .filter(schema::task_scores::columns::user_id.eq(&user_id))
        .order(schema::task_scores::columns::contest_year)
        .load::<TaskScore>(&*conn)?
        .into_iter()
        .group_by(|ts| ts.contest_year)
        .into_iter()
        .map(|(year, scores)| (year, scores.collect::<Vec<TaskScore>>()))
        .collect::<Vec<(i32, Vec<TaskScore>)>>();
    let mut result: Vec<UserDetailParticipation> = Vec::new();
    for (participation, (year, scores)) in izip!(participations, scores) {
        if participation.contest_year != year {
            return Err(Error::NotFound);
        }
        result.push(UserDetailParticipation {
            year: year,
            medal: participation.medal.clone(),
            rank: participation.position,
            scores: scores
                .iter()
                .map(|s| UserDetailScore {
                    task: s.task_name.clone(),
                    score: s.score,
                })
                .collect(),
        });
    }
    Ok(UserDetail {
        contestant: contestant_from_user(&user),
        participations: result,
    })
}

#[get("/users")]
pub fn list(conn: DbConn) -> Result<Json<Users>, Failure> {
    match get_users_list(conn) {
        Ok(users) => Ok(Json(users)),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/users/<user_id>")]
pub fn search(user_id: String, conn: DbConn) -> Result<Json<UserDetail>, Failure> {
    match get_user_detail(user_id, conn) {
        Ok(users) => Ok(Json(users)),
        Err(err) => Err(error_status(err)),
    }
}

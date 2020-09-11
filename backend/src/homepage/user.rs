// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Integer, Nullable, Text};

use crate::controllers::NumMedals;
use crate::db::DbConn;
use crate::models::user::Contestant;
use crate::types::Year;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum UserStat {
    BestStudent(BestStudent),
    WinAtFirstParticipation(WinAtFirstParticipation),
    StudentWithMostParticipations(StudentWithMostParticipations),
    #[serde(rename = "ioist_with_worst_rank")]
    IOIstWithWorstRank(IOIstWithWorstRank),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct BestStudent {
    pub contestant: Contestant,
    pub num_medals: NumMedals,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WinAtFirstParticipation {
    pub contestant: Contestant,
    pub year: Year,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct StudentWithMostParticipations {
    contestant: Contestant,
    num_participations: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct IOIstWithWorstRank {
    contestant: Contestant,
    contest_year: Year,
    rank: usize,
}

fn get_best_student(conn: &DbConn, results: &mut Vec<UserStat>) -> Result<(), Error> {
    let query = "SELECT
        id, name, surname,
        (SELECT COUNT (*) FROM participations WHERE user_id = id AND medal = 'G') AS gold,
        (SELECT COUNT (*) FROM participations WHERE user_id = id AND medal = 'S') AS silver,
        (SELECT COUNT (*) FROM participations WHERE user_id = id AND medal = 'B') AS bronze
        FROM users
        ORDER BY gold DESC, silver DESC, bronze DESC
        LIMIT 2;";
    let users: Vec<(String, Option<String>, String, i32, i32, i32)> =
        sql::<(Text, Nullable<Text>, Text, Integer, Integer, Integer)>(query).load(&**conn)?;
    if users.len() != 2 {
        return Ok(());
    }
    let first = &users[0];
    let second = &users[1];
    // ex-equo of medals
    if (first.3, first.4, first.5) == (second.3, second.4, second.5) {
        return Ok(());
    }
    results.push(UserStat::BestStudent(BestStudent {
        contestant: Contestant {
            id: first.0.clone(),
            first_name: first.1.clone(),
            last_name: first.2.clone(),
        },
        num_medals: NumMedals {
            gold: Some(first.3 as usize),
            silver: Some(first.4 as usize),
            bronze: Some(first.5 as usize),
        },
    }));
    Ok(())
}

fn get_win_at_first_participation(conn: &DbConn, results: &mut Vec<UserStat>) -> Result<(), Error> {
    let query = "SELECT user_id, contest_year, name, surname
            FROM participations AS p
            JOIN users ON users.id = p.user_id
            WHERE
            	position = 1 AND
            	contest_year > (SELECT MIN(contest_year) FROM participations) AND
            	(
                    SELECT COUNT(*)
                    FROM participations
                    WHERE user_id = p.user_id AND contest_year < p.contest_year
                ) = 0";
    let users: Vec<(String, i32, Option<String>, String)> =
        sql::<(Text, Integer, Nullable<Text>, Text)>(query).load(&**conn)?;
    for user in users {
        results.push(UserStat::WinAtFirstParticipation(WinAtFirstParticipation {
            contestant: Contestant {
                id: user.0.clone(),
                first_name: user.2.clone(),
                last_name: user.3.clone(),
            },
            year: user.1,
        }));
    }
    Ok(())
}

fn get_student_with_most_participations(
    conn: &DbConn,
    results: &mut Vec<UserStat>,
) -> Result<(), Error> {
    let query = "SELECT
        user_id, name, surname, COUNT(user_id) AS num
        FROM participations
        JOIN users ON id = user_id
        GROUP BY user_id
        ORDER BY num DESC
        LIMIT 2";
    let users: Vec<(String, Option<String>, String, i32)> =
        sql::<(Text, Nullable<Text>, Text, Integer)>(query).load(&**conn)?;
    if users.len() != 2 {
        return Ok(());
    }
    let first = &users[0];
    let second = &users[1];
    // ex-equo
    if first.3 == second.3 {
        return Ok(());
    }
    results.push(UserStat::StudentWithMostParticipations(
        StudentWithMostParticipations {
            contestant: Contestant {
                id: first.0.clone(),
                first_name: first.1.clone(),
                last_name: first.2.clone(),
            },
            num_participations: first.3 as usize,
        },
    ));
    Ok(())
}

fn get_ioist_with_worst_rank(conn: &DbConn, results: &mut Vec<UserStat>) -> Result<(), Error> {
    let query = "SELECT
        user_id, name, surname, contest_year, position
        FROM participations JOIN users ON id = user_id
        WHERE IOI
        ORDER BY position
        DESC LIMIT 2";
    let users: Vec<(String, Option<String>, String, i32, i32)> =
        sql::<(Text, Nullable<Text>, Text, Integer, Integer)>(query).load(&**conn)?;
    if users.len() != 2 {
        return Ok(());
    }
    let first = &users[0];
    let second = &users[1];
    // ex-equo
    if first.4 == second.4 {
        return Ok(());
    }
    results.push(UserStat::IOIstWithWorstRank(IOIstWithWorstRank {
        contestant: Contestant {
            id: first.0.clone(),
            first_name: first.1.clone(),
            last_name: first.2.clone(),
        },
        contest_year: first.3,
        rank: first.4 as usize,
    }));
    Ok(())
}

pub fn get_user_stats(conn: &DbConn) -> Result<Vec<UserStat>, Error> {
    let mut results: Vec<UserStat> = vec![];
    get_best_student(conn, &mut results)?;
    get_win_at_first_participation(conn, &mut results)?;
    get_student_with_most_participations(conn, &mut results)?;
    get_ioist_with_worst_rank(conn, &mut results)?;
    Ok(results)
}

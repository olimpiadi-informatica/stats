use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Integer, Nullable, Text};
use rocket::response::Failure;
use rocket_contrib::Json;
use std::collections::HashSet;

use db::DbConn;
use error_status;
use models::task::{get_task_list, TaskInfo, TaskInfoList};
use models::user::{get_users_from_id, get_users_list, UserInfo};
use types::Year;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub enum SearchResult {
    User(UserInfo),
    Task {
        year: Year,
        task: TaskInfo,
    },
    Contest {
        year: Year,
        location: Option<String>,
    },
    Region {
        id: String,
        name: String,
    },
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SearchResults {
    results: Vec<SearchResult>,
}

#[derive(FromForm)]
pub struct QueryString {
    pub q: String,
}

fn search_user(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let fts_users: Vec<(String)> = sql::<(Text)>(
        "SELECT id
        FROM users_fts4
        WHERE users_fts4 MATCH ",
    ).bind::<Text, _>(q)
    .sql(" LIMIT 10")
    .load(&**conn)?;
    let users = get_users_from_id(&conn, &fts_users.iter().map(|u| u.clone()).collect())?;
    Ok(get_users_list(conn, &users)?
        .users
        .into_iter()
        .map(|u| SearchResult::User(u))
        .collect())
}

fn search_task(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let fts_tasks: HashSet<(String, Year)> = sql::<(Text, Integer)>(
        "SELECT contest_year, name
             FROM tasks_fts4
             WHERE tasks_fts4 MATCH ",
    ).bind::<Text, _>(q)
    .sql(" LIMIT 10")
    .load(&**conn)?
    .into_iter()
    .collect();

    Ok(get_task_list(conn)?
        .tasks
        .into_iter()
        .map(|TaskInfoList { year, tasks }| {
            tasks.into_iter().map(move |t| SearchResult::Task {
                year: year,
                task: t,
            })
        }).into_iter()
        .flatten()
        .filter(|t| match t {
            SearchResult::Task { year, task } => fts_tasks.contains(&(task.name.clone(), *year)),
            _ => false,
        }).collect())
}

fn search_contest(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let contests: Vec<(Year, Option<String>)> = sql::<(Integer, Nullable<Text>)>(
        "SELECT year, location
        FROM contests_fts4
        WHERE contests_fts4 MATCH ",
    ).bind::<Text, _>(q)
    .sql(" LIMIT 10")
    .load(&**conn)?;
    Ok(contests
        .iter()
        .map(|t| SearchResult::Contest {
            year: t.0,
            location: t.1.clone(),
        }).collect())
}

fn search_region(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let regions: Vec<(String, String)> = sql::<(Text, Text)>(
        "SELECT id, name
        FROM regions_fts4
        WHERE regions_fts4 MATCH ",
    ).bind::<Text, _>(q)
    .sql(" LIMIT 10")
    .load(&**conn)?;
    Ok(regions
        .iter()
        .map(|t| SearchResult::Region {
            id: t.0.clone(),
            name: t.1.clone(),
        }).collect())
}

fn do_search(q: String, conn: DbConn) -> Result<SearchResults, Error> {
    let mut results = search_user(&q, &conn)?;
    results.extend(search_task(&q, &conn)?);
    results.extend(search_contest(&q, &conn)?);
    results.extend(search_region(&q, &conn)?);
    Ok(SearchResults { results: results })
}

#[get("/search?<q>")]
pub fn search(q: QueryString, conn: DbConn) -> Result<Json<SearchResults>, Failure> {
    let q = if !q.q.contains("*") {
        format!("*{}*", q.q)
    } else {
        q.q
    };
    match do_search(q, conn) {
        Ok(results) => Ok(Json(results)),
        Err(err) => Err(error_status(err)),
    }
}

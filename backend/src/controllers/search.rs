use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Integer, Text};
use rocket::http::RawStr;
use rocket::http::Status;
use rocket_contrib::json::Json;
use std::collections::HashSet;

use db::DbConn;
use error_status;
use models::contest::{get_contest_short_detail_list, ContestShortDetail};
use models::region::{get_regions_list, RegionShortDetail};
use models::task::{get_task_list, TaskInfo, TaskInfoList};
use models::user::{get_users_from_id, get_users_list, UserInfo};
use types::Year;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub enum SearchResult {
    User(UserInfo),
    Task { year: Year, task: TaskInfo },
    Contest(ContestShortDetail),
    Region(RegionShortDetail),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SearchResults {
    results: Vec<SearchResult>,
}

fn search_user(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let fts_users: Vec<String> = sql::<Text>(
        "SELECT id
        FROM users_fts4
        WHERE users_fts4 MATCH ",
    )
    .bind::<Text, _>(q)
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
    )
    .bind::<Text, _>(q)
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
        })
        .into_iter()
        .flatten()
        .filter(|t| match t {
            SearchResult::Task { year, task } => fts_tasks.contains(&(task.name.clone(), *year)),
            _ => false,
        })
        .collect())
}

fn search_contest(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let contests: HashSet<Year> = sql::<Integer>(
        "SELECT year
        FROM contests_fts4
        WHERE contests_fts4 MATCH ",
    )
    .bind::<Text, _>(q)
    .sql(" LIMIT 10")
    .load(&**conn)?
    .into_iter()
    .collect();

    Ok(get_contest_short_detail_list(conn)?
        .contests
        .into_iter()
        .filter(|c| contests.contains(&c.year))
        .map(|c| SearchResult::Contest(c))
        .collect())
}

fn search_region(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let regions: HashSet<String> = sql::<Text>(
        "SELECT id
        FROM regions_fts4
        WHERE regions_fts4 MATCH ",
    )
    .bind::<Text, _>(q)
    .sql(" LIMIT 10")
    .load(&**conn)?
    .into_iter()
    .collect();
    Ok(get_regions_list(conn)?
        .regions
        .into_iter()
        .filter(|r| regions.contains(&r.id))
        .map(|r| SearchResult::Region(r))
        .collect())
}

fn do_search(q: String, conn: DbConn) -> Result<SearchResults, Error> {
    let mut results = search_user(&q, &conn)?;
    results.extend(search_task(&q, &conn)?);
    results.extend(search_contest(&q, &conn)?);
    results.extend(search_region(&q, &conn)?);
    Ok(SearchResults { results: results })
}

#[get("/search?<q>")]
pub fn search(q: &RawStr, conn: DbConn) -> Result<Json<SearchResults>, Status> {
    let q = if !q.contains("*") {
        format!("*{}*", q)
    } else {
        q.to_string()
    };
    match do_search(q, conn) {
        Ok(results) => Ok(Json(results)),
        Err(err) => Err(error_status(err)),
    }
}

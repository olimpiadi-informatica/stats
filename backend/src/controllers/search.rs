use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Integer, Nullable, Text};
use rocket::response::Failure;
use rocket_contrib::Json;

use controllers::Contestant;
use db::DbConn;
use error_status;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub enum SearchResult {
    Contestant(Contestant),
    Task { year: i32, name: String },
    Contest { year: i32, location: Option<String> },
    Region { id: String, name: String },
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
    let users: Vec<(String, String, String)> = sql::<(Text, Text, Text)>(
        "SELECT id, name, surname
        FROM users_fts4
        WHERE users_fts4 MATCH ",
    ).bind::<Text, _>(q)
        .sql(" LIMIT 10")
        .load(&**conn)?;
    Ok(users
        .iter()
        .map(|u| {
            SearchResult::Contestant(Contestant {
                id: u.0.clone(),
                first_name: u.1.clone(),
                last_name: u.2.clone(),
            })
        })
        .collect())
}

fn search_task(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let tasks: Vec<(i32, String)> = sql::<(Integer, Text)>(
        "SELECT contest_year, name
        FROM tasks_fts4
        WHERE tasks_fts4 MATCH ",
    ).bind::<Text, _>(q)
        .sql(" LIMIT 10")
        .load(&**conn)?;
    Ok(tasks
        .iter()
        .map(|t| SearchResult::Task {
            year: t.0,
            name: t.1.clone(),
        })
        .collect())
}

fn search_contest(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let contests: Vec<(i32, Option<String>)> = sql::<(Integer, Nullable<Text>)>(
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
        })
        .collect())
}

fn search_region(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let contests: Vec<(String, String)> = sql::<(Text, Text)>(
        "SELECT id, name
        FROM regions_fts4
        WHERE regions_fts4 MATCH ",
    ).bind::<Text, _>(q)
        .sql(" LIMIT 10")
        .load(&**conn)?;
    Ok(contests
        .iter()
        .map(|t| SearchResult::Region {
            id: t.0.clone(),
            name: t.1.clone(),
        })
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

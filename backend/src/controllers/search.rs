use diesel::prelude::*;
use diesel::result::Error;
use diesel::QueryDsl;
use diesel::TextExpressionMethods;
use rocket::response::Failure;
use rocket_contrib::Json;

use controllers::{contestant_from_user, Contestant};
use db::DbConn;
use error_status;
use schema;
use types::{Contest, Region, Task, User};

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
    let users = schema::users::table
        .filter(
            schema::users::columns::name
                .like(format!("%{}%", q))
                .or(schema::users::columns::surname.like(format!("%{}%", q))),
        )
        .limit(10)
        .load::<User>(&**conn)?;
    Ok(users
        .iter()
        .map(|u| SearchResult::Contestant(contestant_from_user(u)))
        .collect())
}

fn search_task(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let tasks = schema::tasks::table
        .filter(schema::tasks::columns::name.like(format!("%{}%", q)))
        .limit(10)
        .load::<Task>(&**conn)?;
    Ok(tasks
        .iter()
        .map(|t| SearchResult::Task {
            year: t.contest_year,
            name: t.name.clone(),
        })
        .collect())
}

fn search_contest(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let contests = schema::contests::table
        .filter(schema::contests::columns::location.like(format!("%{}%", q)))
        .limit(10)
        .load::<Contest>(&**conn)?;
    Ok(contests
        .iter()
        .map(|c| SearchResult::Contest {
            year: c.year,
            location: c.location.clone(),
        })
        .collect())
}

fn search_region(q: &String, conn: &DbConn) -> Result<Vec<SearchResult>, Error> {
    let regions = schema::regions::table
        .filter(
            schema::regions::columns::id
                .like(format!("%{}%", q))
                .or(schema::regions::columns::name.like(format!("%{}%", q))),
        )
        .limit(10)
        .load::<Region>(&**conn)?;
    Ok(regions
        .iter()
        .map(|r| SearchResult::Region {
            id: r.id.clone(),
            name: r.name.clone(),
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
    match do_search(q.q, conn) {
        Ok(results) => Ok(Json(results)),
        Err(err) => Err(error_status(err)),
    }
}

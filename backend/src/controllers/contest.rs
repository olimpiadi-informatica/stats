// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use rocket::http::Status;
use rocket_contrib::json::Json;

use crate::cache::Cache;

use crate::db::DbConn;
use crate::error_status;
use crate::models::contest::{
    get_contest_detail, get_contest_regions, get_contest_results, get_contest_short_detail_list,
    get_contest_tasks, ContestDetail, ContestRegions, ContestResults, ContestTasks, ContestsInfo,
};
use crate::types::Year;

#[get("/contests")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<ContestsInfo>, Status> {
    match get_contest_short_detail_list(&conn) {
        Ok(contests) => Ok(Json(cache.set(contests))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>")]
pub fn search(year: Year, conn: DbConn, mut cache: Cache) -> Result<Json<ContestDetail>, Status> {
    match get_contest_detail(conn, year) {
        Ok(contest) => Ok(Json(cache.set(contest))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/results")]
pub fn results(year: Year, conn: DbConn, mut cache: Cache) -> Result<Json<ContestResults>, Status> {
    match get_contest_results(year, conn) {
        Ok(res) => Ok(Json(cache.set(res))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/regions")]
pub fn regions(year: Year, conn: DbConn, mut cache: Cache) -> Result<Json<ContestRegions>, Status> {
    match get_contest_regions(year, conn) {
        Ok(res) => Ok(Json(cache.set(res))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/contests/<year>/tasks")]
pub fn tasks(year: Year, conn: DbConn, mut cache: Cache) -> Result<Json<ContestTasks>, Status> {
    match get_contest_tasks(year, conn) {
        Ok(res) => Ok(Json(cache.set(res))),
        Err(err) => Err(error_status(err)),
    }
}

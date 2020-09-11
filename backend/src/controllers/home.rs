// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use rocket::http::Status;
use rocket_contrib::json::Json;

use cache::Cache;
use db::DbConn;
use error_status;
use homepage::{get_homepage_stats, HomepageStats};

#[get("/home")]
pub fn home(conn: DbConn, mut cache: Cache) -> Result<Json<HomepageStats>, Status> {
    match get_homepage_stats(&conn) {
        Ok(stats) => Ok(Json(cache.set(stats))),
        Err(err) => Err(error_status(err)),
    }
}

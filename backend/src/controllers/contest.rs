// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use rocket::response::Failure;
use rocket_contrib::Json;

use db::DbConn;
use error_status;
use schema;
use types::Contest;

#[get("/")]
pub fn index(conn: DbConn) -> QueryResult<Json<Vec<Contest>>> {
    use diesel::RunQueryDsl;
    use schema::contests::dsl::*;

    contests
        .load::<Contest>(&*conn)
        .map(|contest| Json(contest))
}

#[get("/<year>")]
pub fn search(year: i32, conn: DbConn) -> Result<Json<Contest>, Failure> {
    schema::contests::dsl::contests
        .find(year)
        .first::<Contest>(&*conn)
        .map(|c| Json(c))
        .map_err(|error| error_status(error))
}

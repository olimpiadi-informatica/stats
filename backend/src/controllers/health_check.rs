// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use rocket::http::Status;
use rocket_contrib::json::Json;

#[get("/health_check")]
pub fn health_check() -> Result<Json<String>, Status> {
    Ok(Json("ok".into()))
}

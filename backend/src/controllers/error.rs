// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use rocket_contrib::{Json, Value};

#[catch(404)]
pub fn not_found() -> Json<Value> {
    Json(json!({"error": "not found"}))
}

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

#![allow(proc_macro_derive_resolution_fallback)]
#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate diesel;
extern crate dotenv;

mod controllers;
mod db;
mod schema;
mod types;

use controllers::contest::*;
use controllers::error::*;

use diesel::result::Error;
use rocket::http::Status;
use rocket::response::Failure;

pub fn error_status(error: Error) -> Failure {
    Failure(match error {
        Error::NotFound => Status::NotFound,
        _ => Status::InternalServerError,
    })
}

fn main() {
    dotenv::dotenv().ok();

    rocket::ignite()
        .manage(db::init_pool())
        .mount("/", routes![index, search])
        .catch(errors![not_found])
        .launch();
}

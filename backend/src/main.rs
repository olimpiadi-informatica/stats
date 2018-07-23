// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

#![allow(proc_macro_derive_resolution_fallback, non_snake_case)]
#![feature(plugin, custom_derive)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;
extern crate serde;
#[macro_use]
extern crate serde_json;
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate itertools;
extern crate dotenv;
extern crate num;
#[macro_use]
extern crate lazy_static;

use diesel::result::Error;
use rocket::http::Status;
use rocket::response::Failure;
use rocket::Catcher;

mod cache;
mod controllers;
mod db;
mod schema;
mod types;
mod utility;

use controllers::contest;
use controllers::error::*;
use controllers::region;
use controllers::search;
use controllers::task;
use controllers::user;

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
        .mount(
            "/",
            routes![
                contest::list,
                contest::search,
                contest::results,
                contest::regions,
                contest::tasks,
                region::list,
                region::search,
                region::results,
                task::list,
                task::search,
                user::list,
                user::search,
                search::search
            ],
        )
        .catch(vec![Catcher::new(200, cache::handle_cache)])
        .catch(errors![not_found])
        .launch();
}

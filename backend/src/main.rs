// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

#![allow(proc_macro_derive_resolution_fallback, non_snake_case)]
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;
extern crate serde;
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
use rocket::Catcher;

mod cache;
mod controllers;
mod cors;
mod db;
mod homepage;
mod models;
mod schema;
mod types;
mod utility;

use controllers::contest;
use controllers::error::*;
use controllers::home;
use controllers::region;
use controllers::search;
use controllers::task;
use controllers::user;
use cors::CORS;

pub fn error_status(error: Error) -> Status {
    match error {
        Error::NotFound => Status::NotFound,
        _ => {
            println!("{:?}", error);
            Status::InternalServerError
        }
    }
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
                search::search,
                home::home
            ],
        )
        .register(vec![Catcher::new(200, cache::handle_cache)])
        .register(catchers![not_found])
        .attach(CORS())
        .launch();
}

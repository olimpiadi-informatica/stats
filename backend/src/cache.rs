use rocket::http::ContentType;
use rocket::http::Status;
use rocket::outcome::Outcome::*;
use rocket::request::{self, FromRequest, Request};
use rocket::response::{Responder, Result};
use rocket::Response;
use serde::Serialize;
use serde_json;
use std::collections::HashMap;
use std::io::Cursor;
use std::sync::Mutex;

lazy_static! {
    pub static ref CACHE: Mutex<HashMap<String, String>> = Mutex::new(HashMap::new());
}

#[derive(Debug)]
pub struct Cache {
    path: String,
}

impl Cache {
    pub fn set<T: Serialize>(&mut self, value: T) -> T {
        let mut cache = CACHE.lock().expect("Failed to obtain the lock on CACHE");
        cache.insert(self.path.clone(), serde_json::to_string(&value).unwrap());
        println!("Added {:?} to cache, {:?} keys", &self.path, cache.len());
        value
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for Cache {
    type Error = ();
    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, ()> {
        let path = request.uri().path().to_string();
        if CACHE
            .lock()
            .expect("Failed to obtain the lock on CACHE")
            .contains_key(&path)
        {
            Failure((Status::Ok, ()))
        } else {
            Success(Cache { path })
        }
    }
}

pub fn handle_cache<'r>(req: &'r Request) -> Result<'r> {
    let uri = req.uri().path().to_string();
    let cached = CACHE
        .lock()
        .unwrap()
        .get(&uri)
        .expect("Cache failed")
        .clone();
    let mut res = Response::new();
    res.set_status(Status::Ok);
    res.set_header(ContentType::JSON);
    res.set_sized_body(Cursor::new(cached));
    res.respond_to(req)
}

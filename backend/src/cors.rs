use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::{ContentType, Header, Method};
use rocket::{Request, Response};
use std::io::Cursor;

pub struct CORS();

impl CORS {
    fn is_origin_allowed(&self, origin: &str) -> bool {
        origin == "http://localhost:3000" || origin.ends_with(".olinfo.it")
    }
}

impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to requests",
            kind: Kind::Response,
        }
    }

    fn on_response(&self, request: &Request, response: &mut Response) {
        let origin = request.headers().get_one("Origin").unwrap_or("");
        if !self.is_origin_allowed(origin) {
            return;
        }

        if response.content_type() == Some(ContentType::JSON) {
            response.set_header(Header::new(
                "Access-Control-Allow-Origin",
                origin.to_string(),
            ));
            response.set_header(Header::new(
                "Access-Control-Allow-Methods",
                "POST, GET, OPTIONS",
            ));
            response.set_header(Header::new("Access-Control-Allow-Headers", "Content-Type"));
            response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
        }

        if request.method() == Method::Options {
            response.set_header(ContentType::Plain);
            response.set_sized_body(Cursor::new(""));
        }
    }
}

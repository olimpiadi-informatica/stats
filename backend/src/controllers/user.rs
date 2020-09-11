use rocket::http::Status;
use rocket_contrib::json::Json;

use cache::Cache;
use db::DbConn;
use error_status;
use models::user::{get_all_users_list, get_user_detail, UserDetail, UserList};

#[get("/users")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<UserList>, Status> {
    match get_all_users_list(conn) {
        Ok(users) => Ok(Json(cache.set(users))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/users/<user_id>")]
pub fn search(user_id: String, conn: DbConn, mut cache: Cache) -> Result<Json<UserDetail>, Status> {
    match get_user_detail(user_id, conn) {
        Ok(users) => Ok(Json(cache.set(users))),
        Err(err) => Err(error_status(err)),
    }
}

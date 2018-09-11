use rocket::response::Failure;
use rocket_contrib::Json;

use cache::Cache;
use db::DbConn;
use error_status;
use models::user::{get_user_detail, get_users_list, UserDetail, UserList};

#[get("/users")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<UserList>, Failure> {
    match get_users_list(conn) {
        Ok(users) => Ok(Json(cache.set(users))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/users/<user_id>")]
pub fn search(
    user_id: String,
    conn: DbConn,
    mut cache: Cache,
) -> Result<Json<UserDetail>, Failure> {
    match get_user_detail(user_id, conn) {
        Ok(users) => Ok(Json(cache.set(users))),
        Err(err) => Err(error_status(err)),
    }
}

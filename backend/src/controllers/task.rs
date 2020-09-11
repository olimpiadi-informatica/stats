use rocket::http::Status;
use rocket_contrib::json::Json;

use crate::cache::Cache;
use crate::db::DbConn;
use crate::error_status;
use crate::models::task::{get_task_detail, get_task_list, TaskDetail, TaskList};
use crate::types::Year;

#[get("/tasks")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<TaskList>, Status> {
    match get_task_list(&conn) {
        Ok(tasks) => Ok(Json(cache.set(tasks))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/tasks/<year>/<task>")]
pub fn search(
    year: Year,
    task: String,
    conn: DbConn,
    mut cache: Cache,
) -> Result<Json<TaskDetail>, Status> {
    match get_task_detail(year, task, conn) {
        Ok(task) => Ok(Json(cache.set(task))),
        Err(err) => Err(error_status(err)),
    }
}

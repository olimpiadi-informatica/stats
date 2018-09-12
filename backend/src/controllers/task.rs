use rocket::response::Failure;
use rocket_contrib::Json;

use cache::Cache;
use db::DbConn;
use error_status;
use models::task::{get_task_detail, get_task_list, TaskDetail, TaskList};
use types::Year;

#[get("/tasks")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<TaskList>, Failure> {
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
) -> Result<Json<TaskDetail>, Failure> {
    match get_task_detail(year, task, conn) {
        Ok(task) => Ok(Json(cache.set(task))),
        Err(err) => Err(error_status(err)),
    }
}

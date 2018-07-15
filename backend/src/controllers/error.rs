use rocket_contrib::{Json, Value};

#[error(404)]
pub fn not_found() -> Json<Value> {
    Json(json!({"error": "not found"}))
}

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use rocket::response::Failure;
use rocket_contrib::Json;
use std::collections::{HashMap, HashSet};
use std::iter::FromIterator;

use controllers::{get_num_medals, Contestant, NumMedals};
use db::DbConn;
use error_status;
use schema;
use types::{Participation, Region, Task, TaskScore, User};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskInfo {
    pub name: String,
    pub index: i32,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskInfoList {
    pub year: i32,
    pub tasks: Vec<TaskInfo>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Tasks {
    pub tasks: Vec<TaskInfoList>,
}

fn get_task_list(conn: DbConn) -> Result<Tasks, Error> {
    let task_scores = schema::task_scores::table
        .order(schema::task_scores::columns::contest_year)
        .then_order_by(schema::task_scores::columns::task_name)
        .load::<TaskScore>(&*conn)?;
    let task_scores = task_scores.into_iter().group_by(|ts| ts.contest_year);
    let task_scores = task_scores.into_iter().map(|(year, tss)| {
        (
            year,
            tss.collect::<Vec<TaskScore>>()
                .into_iter()
                .group_by(|ts| ts.task_name.clone()),
        )
    });
    let task_scores: HashMap<i32, HashMap<String, Vec<TaskScore>>> = task_scores
        .into_iter()
        .map(|(year, tss)| {
            (
                year,
                HashMap::from_iter(
                    tss.into_iter()
                        .map(|(task_name, tss)| (task_name, tss.collect::<Vec<TaskScore>>())),
                ),
            )
        })
        .collect();
    let tasks = schema::tasks::table
        .order(schema::tasks::columns::contest_year)
        .then_order_by(schema::tasks::columns::index)
        .load::<Task>(&*conn)?
        .into_iter()
        .group_by(|t| t.contest_year);

    let mut result: Vec<TaskInfoList> = Vec::new();

    for (year, tasks) in tasks.into_iter() {
        let tasks = tasks.collect::<Vec<Task>>();
        let task_scores = task_scores.get(&year).ok_or(Error::NotFound)?;
        let mut task_info: Vec<TaskInfo> = Vec::new();
        for task in tasks {
            let scores = task_scores.get(&task.name).ok_or(Error::NotFound)?;
            let sum_score = fold_with_none(Some(0.0), scores.iter().map(|ts| ts.score), |m, s| {
                add_option(m, s)
            });
            let avg_score = sum_score.map(|sum| sum / (scores.len() as f32));
            task_info.push(TaskInfo {
                name: task.name.clone(),
                index: task.index,
                max_score_possible: task.max_score,
                max_score: fold_with_none(Some(0.0), scores.iter().map(|ts| ts.score), |m, s| {
                    max_option(m, s)
                }),
                avg_score: avg_score,
            });
        }
        result.push(TaskInfoList {
            year: year,
            tasks: task_info,
        });
    }

    Ok(Tasks { tasks: result })
}

#[get("/tasks")]
pub fn list(conn: DbConn) -> Result<Json<Tasks>, Failure> {
    match get_task_list(conn) {
        Ok(tasks) => Ok(Json(tasks)),
        Err(err) => Err(error_status(err)),
    }
}

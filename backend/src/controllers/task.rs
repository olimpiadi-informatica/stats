use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use rocket::response::Failure;
use rocket_contrib::Json;
use std::cmp::Ordering;
use std::collections::HashMap;
use std::iter::FromIterator;

use cache::Cache;
use controllers::{contestant_from_user, Contestant};
use db::DbConn;
use error_status;
use schema;
use types::{Participation, Task, TaskScore, User, Year};
use utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskNavigationDirection {
    pub year: Year,
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskNavigation {
    pub previous: Option<TaskNavigationDirection>,
    pub next: Option<TaskNavigationDirection>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskInfo {
    pub name: String,
    pub index: usize,
    pub max_score_possible: Option<f32>,
    pub max_score: Option<f32>,
    pub avg_score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskInfoList {
    pub year: Year,
    pub tasks: Vec<TaskInfo>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Tasks {
    pub tasks: Vec<TaskInfoList>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskDetailScore {
    contestant: Contestant,
    rank: Option<usize>,
    score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskDetail {
    year: Year,
    name: String,
    index: usize,
    navigation: TaskNavigation,
    max_score_possible: Option<f32>,
    scores: Vec<TaskDetailScore>,
}

fn get_task_navigation(year: Year, name: &str, conn: DbConn) -> Result<TaskNavigation, Error> {
    let tasks = schema::tasks::table
        .filter(
            schema::tasks::columns::contest_year
                .ge(year - 1)
                .and(schema::tasks::columns::contest_year.le(year + 1)),
        )
        .order(schema::tasks::columns::contest_year)
        .then_order_by(schema::tasks::columns::index)
        .select((
            schema::tasks::columns::contest_year,
            schema::tasks::columns::name,
        ))
        .load::<(Year, String)>(&*conn)?;
    let index = tasks
        .iter()
        .position(|(y, n)| *y == year && n.as_str() == name);
    Ok(TaskNavigation {
        previous: match index {
            Some(0) => None,
            Some(i) => Some(TaskNavigationDirection {
                year: tasks[i - 1].0,
                name: tasks[i - 1].1.clone(),
            }),
            None => None,
        },
        next: match index {
            Some(i) => if i == tasks.len() - 1 {
                None
            } else {
                Some(TaskNavigationDirection {
                    year: tasks[i + 1].0,
                    name: tasks[i + 1].1.clone(),
                })
            },
            None => None,
        },
    })
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
    let task_scores: HashMap<Year, HashMap<String, Vec<TaskScore>>> = task_scores
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
                index: task.index as usize,
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

fn get_task_detail(year: Year, task_name: String, conn: DbConn) -> Result<TaskDetail, Error> {
    let task = schema::tasks::table
        .find((&task_name, year))
        .first::<Task>(&*conn)?;
    let scores: Vec<(TaskScore, Option<User>)> = schema::task_scores::table
        .filter(
            schema::task_scores::columns::contest_year
                .eq(year)
                .and(schema::task_scores::columns::task_name.eq(&task_name)),
        )
        .order(schema::task_scores::columns::user_id)
        .left_join(schema::users::table)
        .load(&*conn)?;
    let participations: Vec<Participation> = schema::participations::table
        .filter(schema::participations::columns::contest_year.eq(year))
        .order(schema::participations::columns::user_id)
        .load(&*conn)?;
    if scores.len() != participations.len() {
        return Err(Error::NotFound);
    }
    let mut result: Vec<TaskDetailScore> = Vec::new();
    for ((score, user), participation) in izip!(scores, &participations) {
        let user = user.ok_or(Error::NotFound)?;
        result.push(TaskDetailScore {
            contestant: contestant_from_user(&user),
            rank: participation.position.map(|p| p as usize),
            score: score.score,
        });
    }
    result.sort_unstable_by(|a, b| a.score.partial_cmp(&b.score).unwrap_or(Ordering::Equal));
    Ok(TaskDetail {
        year: year,
        name: task_name.clone(),
        index: task.index as usize,
        navigation: get_task_navigation(year, task_name.as_str(), conn)?,
        max_score_possible: task.max_score,
        scores: result,
    })
}

#[get("/tasks")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<Tasks>, Failure> {
    match get_task_list(conn) {
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

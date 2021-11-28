// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::prelude::*;
use diesel::result::Error;
use diesel::RunQueryDsl;
use itertools::Itertools;
use std::cmp::Ordering;
use std::collections::HashMap;
use std::iter::FromIterator;

use crate::db::DbConn;
use crate::models::participation::get_participations;
use crate::models::task_score::{get_scores_of_task_with_user, get_task_scores};
use crate::models::user::{contestant_from_user, Contestant};
use crate::schema;
use crate::types::{Task, TaskScore, Year};
use crate::utility::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskNavigationDirection {
    pub year: Year,
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskNavigation {
    pub current: TaskNavigationDirection,
    pub previous: Option<TaskNavigationDirection>,
    pub next: Option<TaskNavigationDirection>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskInfo {
    pub contest_year: Year,
    pub name: String,
    pub title: String,
    pub link: Option<String>,
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
pub struct TaskList {
    pub tasks: Vec<TaskInfoList>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskDetailScore {
    contestant: Contestant,
    ioi: bool,
    rank: Option<usize>,
    score: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskDetail {
    contest_year: Year,
    title: String,
    link: Option<String>,
    index: usize,
    navigation: TaskNavigation,
    max_score_possible: Option<f32>,
    scores: Vec<TaskDetailScore>,
}

pub fn get_tasks_of_year(conn: &DbConn, year: Year) -> Result<Vec<Task>, Error> {
    schema::tasks::table
        .filter(schema::tasks::columns::contest_year.eq(year))
        .load::<Task>(&**conn)
}

pub fn get_tasks_by_year(conn: &DbConn) -> Result<Vec<(Year, Vec<Task>)>, Error> {
    Ok(schema::tasks::table
        .order(schema::tasks::columns::contest_year)
        .then_order_by(schema::tasks::columns::index)
        .load::<Task>(&**conn)?
        .into_iter()
        .group_by(|t| t.contest_year)
        .into_iter()
        .map(|(y, t)| (y, t.collect()))
        .collect())
}

pub fn get_scores_of_year(
    conn: &DbConn,
    year: Year,
) -> Result<HashMap<String, Vec<TaskScore>>, Error> {
    Ok(schema::task_scores::table
        .filter(schema::task_scores::columns::contest_year.eq(year))
        .order(schema::task_scores::columns::task_name)
        .load::<TaskScore>(&**conn)?
        .into_iter()
        .group_by(|ts| ts.task_name.clone())
        .into_iter()
        .map(|p| (p.0.clone(), p.1.collect()))
        .collect())
}

pub fn get_task_navigation(year: Year, name: &str, conn: DbConn) -> Result<TaskNavigation, Error> {
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
        current: TaskNavigationDirection {
            year,
            name: name.to_string(),
        },
        previous: match index {
            Some(0) => None,
            Some(i) => Some(TaskNavigationDirection {
                year: tasks[i - 1].0,
                name: tasks[i - 1].1.clone(),
            }),
            None => None,
        },
        next: match index {
            Some(i) => {
                if i == tasks.len() - 1 {
                    None
                } else {
                    Some(TaskNavigationDirection {
                        year: tasks[i + 1].0,
                        name: tasks[i + 1].1.clone(),
                    })
                }
            }
            None => None,
        },
    })
}

pub fn get_task_list(conn: &DbConn) -> Result<TaskList, Error> {
    let task_scores = get_task_scores(&conn)?;
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
    let tasks = get_tasks_by_year(&conn)?;

    let mut result: Vec<TaskInfoList> = Vec::new();

    for (year, tasks) in tasks.into_iter() {
        let task_scores = task_scores.get(&year).ok_or(Error::NotFound)?;
        let mut task_info: Vec<TaskInfo> = Vec::new();
        for task in tasks {
            let scores = task_scores.get(&task.name).ok_or(Error::NotFound)?;
            let sum_score = fold_with_none(Some(0.0), scores.iter().map(|ts| ts.score), |m, s| {
                add_option(m, s)
            });
            let avg_score = sum_score.map(|sum| sum / (scores.len() as f32));
            task_info.push(TaskInfo {
                contest_year: year,
                name: task.name.clone(),
                title: task.title.clone(),
                link: task.link.clone(),
                index: task.index as usize,
                max_score_possible: task.max_score,
                max_score: fold_with_none(Some(0.0), scores.iter().map(|ts| ts.score), |m, s| {
                    max_option(m, s)
                }),
                avg_score,
            });
        }
        result.push(TaskInfoList {
            year,
            tasks: task_info,
        });
    }

    Ok(TaskList { tasks: result })
}

pub fn get_task_detail(year: Year, task_name: String, conn: DbConn) -> Result<TaskDetail, Error> {
    let task = schema::tasks::table
        .find((&task_name, year))
        .first::<Task>(&*conn)?;
    let scores = get_scores_of_task_with_user(&conn, year, &task_name)?;
    let participations = get_participations(&conn, year)?;
    if scores.len() != participations.len() {
        return Err(Error::NotFound);
    }
    let mut result: Vec<TaskDetailScore> = Vec::new();
    for ((score, user), participation) in izip!(scores, &participations) {
        result.push(TaskDetailScore {
            contestant: contestant_from_user(&user),
            ioi: participation.IOI.unwrap_or(false),
            rank: participation.position.map(|p| p as usize),
            score: score.score,
        });
    }
    // sort by score desc and then by rank asc
    result.sort_unstable_by(|a, b| {
        (b.score, a.rank)
            .partial_cmp(&(a.score, b.rank))
            .unwrap_or(Ordering::Equal)
    });
    Ok(TaskDetail {
        contest_year: year,
        title: task.title.clone(),
        link: task.link.clone(),
        index: task.index as usize,
        navigation: get_task_navigation(year, task_name.as_str(), conn)?,
        max_score_possible: task.max_score,
        scores: result,
    })
}

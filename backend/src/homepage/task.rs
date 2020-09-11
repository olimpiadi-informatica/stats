// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use diesel::expression::sql_literal::sql;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::sql_types::{Float, Integer, Text};

use crate::db::DbConn;
use crate::types::Year;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum TaskStat {
    TaskWithLowestAvgScore(TaskWithLowestAvgScore),
    TaskWithHighestAvgScore(TaskWithHighestAvgScore),
    TaskWithLowestMaxScore(TaskWithLowestMaxScore),
    TaskWithMostZeros(TaskWithMostZeros),
    TaskWithMostFullscores(TaskWithMostFullscores),
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithLowestAvgScore {
    pub contest_year: Year,
    pub name: String,
    pub title: String,
    pub avg_score: f32,
    pub max_score_possible: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithHighestAvgScore {
    pub contest_year: Year,
    pub name: String,
    pub title: String,
    pub avg_score: f32,
    pub max_score_possible: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithLowestMaxScore {
    pub contest_year: Year,
    pub name: String,
    pub title: String,
    pub max_score: f32,
    pub max_score_possible: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithMostZeros {
    pub contest_year: Year,
    pub name: String,
    pub title: String,
    pub num_zeros: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithMostFullscores {
    pub contest_year: Year,
    pub name: String,
    pub title: String,
    pub num_fullscores: usize,
}

fn get_task_with_lowest_avg_score(conn: &DbConn, results: &mut Vec<TaskStat>) -> Result<(), Error> {
    let query = "SELECT
        task_name, title, tasks.contest_year, max_score, AVG(score), AVG(score)/max_score
        FROM task_scores
        JOIN tasks ON task_name = name AND task_scores.contest_year = tasks.contest_year
        WHERE score IS NOT NULL
        GROUP BY task_name, tasks.contest_year
        ORDER BY AVG(score)/max_score
        LIMIT 2";
    let tasks: Vec<(String, String, i32, f32, f32, f32)> =
        sql::<(Text, Text, Integer, Float, Float, Float)>(query).load(&**conn)?;
    if tasks.len() != 2 {
        return Ok(());
    }
    let first = &tasks[0];
    let second = &tasks[1];
    if first.5 == second.5 {
        return Ok(());
    }
    results.push(TaskStat::TaskWithLowestAvgScore(TaskWithLowestAvgScore {
        contest_year: first.2,
        name: first.0.clone(),
        title: first.1.clone(),
        avg_score: first.4,
        max_score_possible: first.3,
    }));
    Ok(())
}

fn get_task_with_highest_avg_score(
    conn: &DbConn,
    results: &mut Vec<TaskStat>,
) -> Result<(), Error> {
    let query = "SELECT
        task_name, title, tasks.contest_year, max_score, AVG(score), AVG(score)/max_score
        FROM task_scores
        JOIN tasks ON task_name = name AND task_scores.contest_year = tasks.contest_year
        WHERE score IS NOT NULL
        GROUP BY task_name, tasks.contest_year
        ORDER BY AVG(score)/max_score DESC
        LIMIT 2";
    let tasks: Vec<(String, String, i32, f32, f32, f32)> =
        sql::<(Text, Text, Integer, Float, Float, Float)>(query).load(&**conn)?;
    if tasks.len() != 2 {
        return Ok(());
    }
    let first = &tasks[0];
    let second = &tasks[1];
    if first.5 == second.5 {
        return Ok(());
    }
    results.push(TaskStat::TaskWithHighestAvgScore(TaskWithHighestAvgScore {
        contest_year: first.2,
        name: first.0.clone(),
        title: first.1.clone(),
        avg_score: first.4,
        max_score_possible: first.3,
    }));
    Ok(())
}

fn get_task_with_lowest_max_score(conn: &DbConn, results: &mut Vec<TaskStat>) -> Result<(), Error> {
    let query = "SELECT
        task_name, title, tasks.contest_year, max_score, MAX(score), MAX(score)/max_score
        FROM task_scores
        JOIN tasks ON task_name = name AND task_scores.contest_year = tasks.contest_year
        WHERE score IS NOT NULL
        GROUP BY task_name, tasks.contest_year
        ORDER BY MAX(score)/max_score
        LIMIT 2";
    let tasks: Vec<(String, String, i32, f32, f32, f32)> =
        sql::<(Text, Text, Integer, Float, Float, Float)>(query).load(&**conn)?;
    if tasks.len() != 2 {
        return Ok(());
    }
    let first = &tasks[0];
    let second = &tasks[1];
    if first.5 == second.5 {
        return Ok(());
    }
    results.push(TaskStat::TaskWithLowestMaxScore(TaskWithLowestMaxScore {
        contest_year: first.2,
        name: first.0.clone(),
        title: first.1.clone(),
        max_score: first.4,
        max_score_possible: first.3,
    }));
    Ok(())
}

fn get_task_with_most_zeros(conn: &DbConn, results: &mut Vec<TaskStat>) -> Result<(), Error> {
    let query = "SELECT
        task_name, title, tasks.contest_year, COUNT(*) AS num
        FROM task_scores
        JOIN tasks ON task_name = name AND task_scores.contest_year = tasks.contest_year
        WHERE score = 0
        GROUP BY task_name, tasks.contest_year
        ORDER BY num DESC
        LIMIT 2";
    let tasks: Vec<(String, String, i32, i32)> =
        sql::<(Text, Text, Integer, Integer)>(query).load(&**conn)?;
    if tasks.len() != 2 {
        return Ok(());
    }
    let first = &tasks[0];
    let second = &tasks[1];
    if first.3 == second.3 {
        return Ok(());
    }
    results.push(TaskStat::TaskWithMostZeros(TaskWithMostZeros {
        contest_year: first.2,
        name: first.0.clone(),
        title: first.1.clone(),
        num_zeros: first.3 as usize,
    }));
    Ok(())
}

fn get_task_with_most_fullscores(conn: &DbConn, results: &mut Vec<TaskStat>) -> Result<(), Error> {
    let query = "SELECT
        task_name, title, tasks.contest_year, COUNT(*) AS num
        FROM task_scores
        JOIN tasks ON task_name = name AND task_scores.contest_year = tasks.contest_year
        WHERE score = max_score
        GROUP BY task_name, tasks.contest_year
        ORDER BY num DESC
        LIMIT 2";
    let tasks: Vec<(String, String, i32, i32)> =
        sql::<(Text, Text, Integer, Integer)>(query).load(&**conn)?;
    if tasks.len() != 2 {
        return Ok(());
    }
    let first = &tasks[0];
    let second = &tasks[1];
    if first.3 == second.3 {
        return Ok(());
    }
    results.push(TaskStat::TaskWithMostFullscores(TaskWithMostFullscores {
        contest_year: first.2,
        name: first.0.clone(),
        title: first.1.clone(),
        num_fullscores: first.3 as usize,
    }));
    Ok(())
}

pub fn get_task_stats(conn: &DbConn) -> Result<Vec<TaskStat>, Error> {
    let mut results: Vec<TaskStat> = vec![];
    get_task_with_lowest_avg_score(conn, &mut results)?;
    get_task_with_highest_avg_score(conn, &mut results)?;
    get_task_with_lowest_max_score(conn, &mut results)?;
    get_task_with_most_zeros(conn, &mut results)?;
    get_task_with_most_fullscores(conn, &mut results)?;
    Ok(results)
}

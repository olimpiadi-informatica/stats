// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

#[derive(Serialize, Deserialize, Queryable)]
pub struct Contest {
    pub year: i32,
    pub location: Option<String>,
    pub region: Option<String>,
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct User {
    pub id: String,
    pub name: String,
    pub surname: String,
    pub birth: Option<String>,
    pub gender: Option<String>,
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct Participation {
    pub user_id: String,
    pub contest_year: i32,
    pub position: Option<i32>,
    pub school: Option<String>,
    pub venue: Option<String>,
    pub region: Option<String>,
    pub medal: Option<String>,
    pub IOI: Option<bool>,
    pub score: Option<f32>,
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct Task {
    pub name: String,
    pub contest_year: i32,
    pub index: i32,
    pub max_score: Option<f32>,
}

#[derive(Serialize, Deserialize, Queryable)]
pub struct TaskScore {
    pub task_name: String,
    pub contest_year: i32,
    pub user_id: String,
    pub score: Option<f32>,
}

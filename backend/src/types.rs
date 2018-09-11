// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use schema::{contests, participations, regions, task_scores, tasks, users};

// it would be nice to have a u32 here but diesel does not like unsigned integers
// with sqlite
pub type Year = i32;

#[derive(Serialize, Deserialize, Queryable, Identifiable, Debug, Clone)]
#[primary_key(id)]
pub struct Region {
    pub id: String,
    pub name: String,
}

impl PartialEq for Region {
    fn eq(&self, other: &Region) -> bool {
        self.id == other.id
    }
}

#[derive(Serialize, Deserialize, Queryable, Identifiable, Debug, Clone)]
#[primary_key(year)]
pub struct Contest {
    pub year: Year,
    pub location: Option<String>,
    pub gmaps: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub region: Option<String>,
}

#[derive(Serialize, Deserialize, Queryable, Identifiable, Debug, Clone)]
pub struct User {
    pub id: String,
    pub name: String,
    pub surname: String,
    pub birth: Option<String>,
    pub gender: Option<String>,
}

#[derive(Serialize, Deserialize, Queryable, Associations, Identifiable, Debug, Clone)]
#[belongs_to(Contest, foreign_key = "contest_year")]
#[belongs_to(User, foreign_key = "user_id")]
#[primary_key(user_id, contest_year)]
pub struct Participation {
    pub user_id: String,
    pub contest_year: Year,
    pub position: Option<i32>,
    pub school: Option<String>,
    pub venue: Option<String>,
    pub region: Option<String>,
    pub medal: Option<String>,
    pub IOI: Option<bool>,
    pub score: Option<f32>,
}

#[derive(Serialize, Deserialize, Queryable, Associations, Identifiable, Debug, Clone)]
#[belongs_to(Contest, foreign_key = "contest_year")]
#[primary_key(name, contest_year)]
pub struct Task {
    pub name: String,
    pub contest_year: Year,
    pub index: i32,
    pub max_score: Option<f32>,
    pub title: String,
    pub link: Option<String>,
}

#[derive(Serialize, Deserialize, Queryable, Associations, Identifiable, Debug, Clone)]
#[belongs_to(Task, foreign_key = "task_name")]
#[belongs_to(Contest, foreign_key = "contest_year")]
#[belongs_to(User, foreign_key = "user_id")]
#[primary_key(task_name, contest_year, user_id)]
pub struct TaskScore {
    pub task_name: String,
    pub contest_year: Year,
    pub user_id: String,
    pub score: Option<f32>,
}

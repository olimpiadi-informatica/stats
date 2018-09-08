// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use types::{Contest, Participation, User};

#[derive(Serialize, Deserialize, Debug)]
pub struct NumMedals {
    pub gold: Option<usize>,
    pub silver: Option<usize>,
    pub bronze: Option<usize>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Contestant {
    pub id: String,
    pub first_name: String,
    pub last_name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContestLocation {
    pub location: Option<String>,
    pub gmaps: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
}

fn contestant_from_user(user: &User) -> Contestant {
    Contestant {
        id: user.id.clone(),
        first_name: user.name.clone(),
        last_name: user.surname.clone(),
    }
}

fn count_medals(participations: &Vec<Participation>, medal: &str) -> Option<usize> {
    if participations.is_empty() {
        None
    } else {
        Some(
            participations
                .iter()
                .filter(|p| p.medal.as_ref().map_or(false, |x| x.as_str() == medal))
                .count(),
        )
    }
}

pub fn get_num_medals(participations: &Vec<Participation>) -> NumMedals {
    NumMedals {
        gold: count_medals(&participations, "G"),
        silver: count_medals(&participations, "S"),
        bronze: count_medals(&participations, "B"),
    }
}

fn get_contest_location(contest: &Contest) -> ContestLocation {
    ContestLocation {
        location: contest.location.clone(),
        gmaps: contest.gmaps.clone(),
        latitude: contest.latitude,
        longitude: contest.longitude,
    }
}

pub mod contest;
pub mod error;
pub mod region;
pub mod search;
pub mod task;
pub mod user;

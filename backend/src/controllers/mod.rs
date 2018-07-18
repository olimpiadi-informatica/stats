// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use types::Participation;

#[derive(Serialize, Deserialize, Debug)]
pub struct NumMedals {
    pub gold: Option<i32>,
    pub silver: Option<i32>,
    pub bronze: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Contestant {
    pub id: String,
    pub first_name: String,
    pub last_name: String,
}

fn count_medals(participations: &Vec<Participation>, medal: &str) -> Option<i32> {
    if participations.is_empty() {
        None
    } else {
        Some(
            participations
                .iter()
                .filter(|p| p.medal.as_ref().map_or(false, |x| x.as_str() == medal))
                .count() as i32,
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

pub mod contest;
pub mod error;
pub mod region;

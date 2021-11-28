// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use crate::types::Participation;

pub mod contest;
pub mod error;
pub mod home;
pub mod region;
pub mod search;
pub mod task;
pub mod user;

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy)]
pub struct NumMedals {
    pub gold: Option<usize>,
    pub silver: Option<usize>,
    pub bronze: Option<usize>,
}

fn count_medals(participations: &[Participation], medal: &str) -> Option<usize> {
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

pub fn get_num_medals(participations: &[Participation]) -> NumMedals {
    NumMedals {
        gold: count_medals(&participations, "G"),
        silver: count_medals(&participations, "S"),
        bronze: count_medals(&participations, "B"),
    }
}

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use types::User;

#[derive(Serialize, Deserialize, Debug)]
pub struct Contestant {
    pub id: String,
    pub first_name: String,
    pub last_name: String,
}

pub fn contestant_from_user(user: &User) -> Contestant {
    Contestant {
        id: user.id.clone(),
        first_name: user.name.clone(),
        last_name: user.surname.clone(),
    }
}

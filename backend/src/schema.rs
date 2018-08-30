// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

table! {
    regions (id) {
        id -> Text,
        name -> Text,
    }
}

table! {
    contests (year) {
        year -> Integer,
        location -> Nullable<Text>,
        gmaps -> Nullable<Text>,
        latitude -> Nullable<Float>,
        longitude -> Nullable<Float>,
        region -> Nullable<Text>,
    }
}

table! {
    users (id) {
        id -> Text,
        name -> Text,
        surname -> Text,
        birth -> Nullable<Text>,
        gender -> Nullable<Text>,
    }
}

table! {
    participations (user_id, contest_year) {
        user_id -> Text,
        contest_year -> Integer,
        position -> Nullable<Integer>,
        school -> Nullable<Text>,
        venue -> Nullable<Text>,
        region -> Nullable<Text>,
        medal -> Nullable<Text>,
        IOI -> Nullable<Bool>,
        score -> Nullable<Float>,
    }
}

joinable!(participations -> users(user_id));
joinable!(participations -> regions(region));
allow_tables_to_appear_in_same_query!(participations, users);
allow_tables_to_appear_in_same_query!(participations, regions);

table! {
    tasks (name, contest_year) {
        name -> Text,
        contest_year -> Integer,
        index -> Integer,
        max_score -> Nullable<Float>,
        title -> Text,
        link -> Nullable<Text>,
    }
}

table! {
    task_scores (task_name, contest_year, user_id) {
        task_name -> Text,
        contest_year -> Integer,
        user_id -> Text,
        score -> Nullable<Float>,
    }
}

joinable!(task_scores -> users(user_id));
allow_tables_to_appear_in_same_query!(task_scores, users);

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use num::Zero;
use std::cmp::PartialOrd;
use std::iter::ExactSizeIterator;
use std::ops::{Add, FnMut};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub enum Medal {
    Gold,
    Silver,
    Bronze,
}

pub fn add_option<T: Add<Output = T>>(a: Option<T>, b: Option<T>) -> Option<T> {
    match (a, b) {
        (Some(x), Some(y)) => Some(x + y),
        _ => None,
    }
}

pub fn max_option<T: PartialOrd>(a: Option<T>, b: Option<T>) -> Option<T> {
    match (a, b) {
        (Some(x), Some(y)) => Some(if x < y { y } else { x }),
        _ => None,
    }
}

pub fn min_option<T: PartialOrd>(a: Option<T>, b: Option<T>) -> Option<T> {
    match (a, b) {
        (Some(x), Some(y)) => Some(if x < y { x } else { y }),
        _ => None,
    }
}

pub fn zero_is_none<T: Zero>(val: T) -> Option<T> {
    if val.is_zero() {
        None
    } else {
        Some(val)
    }
}

pub fn fold_with_none<T, I: ExactSizeIterator, F>(
    initial: Option<T>,
    iter: I,
    fold_fn: F,
) -> Option<T>
where
    F: FnMut(Option<T>, <I as Iterator>::Item) -> Option<T>,
{
    match iter.len() {
        0 => None,
        _ => iter.fold(initial, fold_fn),
    }
}

pub fn medal_from_string(medal: &Option<String>) -> Option<Medal> {
    match medal.as_ref().map(|m| m.as_str()) {
        Some("G") => Some(Medal::Gold),
        Some("S") => Some(Medal::Silver),
        Some("B") => Some(Medal::Bronze),
        _ => None,
    }
}

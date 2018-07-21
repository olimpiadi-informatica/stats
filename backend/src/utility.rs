// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use num::Zero;
use std::cmp::PartialOrd;
use std::iter::ExactSizeIterator;
use std::ops::{Add, FnMut};

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

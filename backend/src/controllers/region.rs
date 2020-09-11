// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

use rocket::http::Status;
use rocket_contrib::json::Json;

use cache::Cache;
use db::DbConn;
use error_status;
use models::region::{
    get_region_details, get_region_results, get_regions_list, RegionDetail, RegionResults,
    RegionsShortDetail,
};

#[get("/regions")]
pub fn list(conn: DbConn, mut cache: Cache) -> Result<Json<RegionsShortDetail>, Status> {
    match get_regions_list(&conn) {
        Ok(regions) => Ok(Json(cache.set(regions))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/regions/<region>")]
pub fn search(
    region: String,
    conn: DbConn,
    mut cache: Cache,
) -> Result<Json<RegionDetail>, Status> {
    match get_region_details(region, conn) {
        Ok(region) => Ok(Json(cache.set(region))),
        Err(err) => Err(error_status(err)),
    }
}

#[get("/regions/<region>/results")]
pub fn results(
    region: String,
    conn: DbConn,
    mut cache: Cache,
) -> Result<Json<RegionResults>, Status> {
    match get_region_results(region, conn) {
        Ok(results) => Ok(Json(cache.set(results))),
        Err(err) => Err(error_status(err)),
    }
}

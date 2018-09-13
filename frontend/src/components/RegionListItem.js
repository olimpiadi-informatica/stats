import React from "react";
import { Link } from "react-router-dom";
// import _ from "lodash";

const RegionListItem = ({ region }) => {
  if (!region) return <div className="Loading">Loading ...</div>;

  const avg_contestants_per_year = region.avg_contestants_per_year ? (
    <div>{region.avg_contestants_per_year.toFixed(2)}</div>
  ) : (
    "N/a"
  );
  const num_contestants = region.num_contestants
    ? region.num_contestants
    : "N/a";
  const picture = region.name
    ? `/regions/${region.name}.png`
    : "/placeholder.jpg";

  const medals = region.medals ? (
    <div className="col-12 col-md-5 align-items-center text-center">
      <div className="gold d-inline-block p-2">
        <ion-icon name="medal" size="large" />
        <div className="text-center">{region.medals.gold}</div>
      </div>
      <div className="silver d-inline-block p-2">
        <ion-icon name="medal" size="large" />
        <div className="text-center">{region.medals.silver}</div>
      </div>
      <div className="bronze d-inline-block p-2">
        <ion-icon name="medal" size="large" />
        <div className="text-center">{region.medals.bronze}</div>
      </div>
    </div>
  ) : (
    <div />
  );

  return (
    <li className="RegionListItemContainer list-group-item">
      <div className=" row">
        <div className="col-12">
          <Link className="text-success" to={`/region/${region.id}`}>
            <h6>{region.name}</h6>
          </Link>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-12 col-md-7">
          <div className="media">
            <img
              className="mr-3 align-self-start"
              height="100"
              width="100"
              src={picture}
              alt="proPicture"
            />
            <div className="media-body">
              <dl className="row">
                <dt className="col-sm-6">Avg Contestants per Year</dt>
                <dd className="col-sm-6">{avg_contestants_per_year}</dd>
                <dt className="col-sm-6">Number of Contestants</dt>
                <dd className="col-sm-6">{num_contestants}</dd>
              </dl>
            </div>
          </div>
        </div>
        {medals}
      </div>
    </li>
  );
};

export default RegionListItem;

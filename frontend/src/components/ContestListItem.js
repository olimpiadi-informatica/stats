import React from "react";
import { Link } from "react-router-dom";

function imageError(event) {
  event.target.src = "/placeholder.jpg";
}

const ContestListItem = ({ contest }) => {
  if (!contest) return <div className="Loading">Loading ...</div>;

  const num_contestants = contest.num_contestants
    ? contest.num_contestants
    : "N/a";
  const max_score_possible = contest.max_score_possible
    ? contest.max_score_possible
    : "N/a";
  const max_score = contest.max_score ? contest.max_score : "N/a";
  const avg_score = contest.avg_score ? contest.avg_score.toFixed(2) : "N/a";

  return (
    <li className="list-group-item ">
      <div className="row ">
        <div className="col-12">
          <Link className="text-success" to={`/contest/${contest.year}`}>
            <h6>
              {contest.location.location} {contest.year}
            </h6>
          </Link>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-12 col-md-7">
          <div className="media">
            <img
              className="mr-3 align-self-start img-fluid"
              src={`/contests/${contest.year}.jpg`}
              alt="Contest"
              onError={imageError}
              width="125"
            />

            <div className="media-body">
              <dl className="row">
                <dt className="col-sm-6">Contestants</dt>
                <dd className="col-sm-6">{num_contestants}</dd>
                <dt className="col-sm-6">Max possible score</dt>
                <dd className="col-sm-6">{max_score_possible}</dd>
                <dt className="col-sm-6">Max score</dt>
                <dd className="col-sm-6">{max_score}</dd>
                <dt className="col-sm-6">Avg score</dt>
                <dd className="col-sm-6">{avg_score}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5 align-items-center text-center">
          <div className="gold d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{contest.medals.gold.number}</div>
          </div>
          <div className="silver d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{contest.medals.silver.number}</div>
          </div>
          <div className="bronze d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{contest.medals.bronze.number}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContestListItem;

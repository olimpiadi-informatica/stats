import React from "react";
import { Link } from "react-router-dom";

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
      <div className="row align-items-center">
        <div className="col-12">
          <Link to={`/contest/${contest.year}`}>
            <h5>
              {contest.location.location} {contest.year}
            </h5>
          </Link>
        </div>
        <div className="col-12 col-md-7">
          <dl className="row">
            <dt className="col-sm-7">Contestants</dt>
            <dd className="col-sm-5">{num_contestants}</dd>

            <dt className="col-sm-7">Max possible score</dt>
            <dd className="col-sm-5">{max_score_possible}</dd>

            <dt className="col-sm-7">Max score</dt>
            <dd className="col-sm-5">{max_score}</dd>

            <dt className="col-sm-7">Avg score</dt>
            <dd className="col-sm-5">{avg_score}</dd>
          </dl>
        </div>
        <div className="col-12 col-md-5 align-items-center">
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

import React from "react";
import { Link } from "react-router-dom";

const ContestListItem = ({ contest }) => {
  if (!contest) return <div className="Loading">Loading ...</div>;

  const num_contestants = contest.num_contestants ? (
    <div> num_contestants: {contest.num_contestants}</div>
  ) : (
    ""
  );
  const max_score_possible = contest.max_score_possible ? (
    <div> max_score_possible: {contest.max_score_possible}</div>
  ) : (
    ""
  );
  const max_score = contest.max_score ? (
    <div> max_score: {contest.max_score}</div>
  ) : (
    ""
  );
  const avg_score = contest.avg_score ? (
    <div> avg_score: {contest.avg_score}</div>
  ) : (
    ""
  );

  return (
    <div className="ContestsListItemContainer">
      <li className="list-group-item ">
        <div className="row align-items-center">
          <div className="col-12">
            <Link to={`/contest/${contest.year}`}>
              {contest.location.location} {contest.year}
            </Link>
          </div>
          <div className="col-6">
            <div>{num_contestants}</div>
            <div>{max_score_possible}</div>
            <div>{max_score}</div>
            <div>{avg_score}</div>
          </div>
          <div className="col-6">
            Gold {contest.medals.gold.number}
            Silver {contest.medals.silver.number}
            Bronze {contest.medals.bronze.number}
          </div>
        </div>
      </li>
    </div>
  );
};

export default ContestListItem;

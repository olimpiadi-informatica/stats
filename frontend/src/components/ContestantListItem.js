import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const ContestantListItem = ({ contestant }) => {
  if (!contestant) return <div className="Loading">Loading ...</div>;

  const participations = _.map(
    contestant.participations,
    (partecipation, i) => {
      return <span key={contestant + i}>{partecipation.year} </span>;
    }
  );
  const best_rank = contestant.best_rank ? (
    <div>{contestant.best_rank}</div>
  ) : (
    "N/a"
  );
  const medals = contestant.num_medals ? (
    <div className="col-12 col-md-5 align-items-center">
      <div className="gold d-inline-block p-2">
        <ion-icon name="medal" size="large" />
        <div className="text-center">{contestant.num_medals.gold}</div>
      </div>
      <div className="silver d-inline-block p-2">
        <ion-icon name="medal" size="large" />
        <div className="text-center">{contestant.num_medals.silver}</div>
      </div>
      <div className="bronze d-inline-block p-2">
        <ion-icon name="medal" size="large" />
        <div className="text-center">{contestant.num_medals.bronze}</div>
      </div>
    </div>
  ) : (
    <div />
  );

  return (
    <li className="ContestantListItemContainer list-group-item">
      <div className=" row align-items-center">
        <div className="col-12">
          <Link to={`/contestant/${contestant.contestant.id}`}>
            <h5>
              {contestant.contestant.first_name}{" "}
              {contestant.contestant.last_name}
            </h5>
          </Link>
        </div>
        <div className="col-12 col-md-7">
          <dl className="row">
            <dt className="col-sm-5">Best Rank</dt>
            <dd className="col-sm-7">{best_rank}</dd>
            <dt className="col-sm-5">Participations</dt>
            <dd className="col-sm-7">{participations}</dd>
          </dl>
        </div>
        {medals}
      </div>
    </li>
  );
};

export default ContestantListItem;

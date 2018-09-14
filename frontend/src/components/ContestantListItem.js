import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

function imageError(event) {
  event.target.src = "/placeholder.jpg";
}

const ContestantListItem = ({ contestant }) => {
  if (!contestant) return <div className="Loading">Loading ...</div>;

  const participations = _.map(
    contestant.participations,
    (partecipation, i) => {
      return (
        <span key={contestant + i}>
          <Link to={`/contest/${partecipation.year}`}>
            {partecipation.year}{" "}
          </Link>
        </span>
      );
    }
  );
  const best_rank = contestant.best_rank ? (
    <div>{contestant.best_rank}</div>
  ) : (
    "N/a"
  );

  const medals = contestant.num_medals ? (
    <div className="col-12 col-md-5 align-self-center text-center">
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
    <li className="ContestantListItemContainer list-group-item ">
      <div className="row ">
        <div className="col-12">
          <Link
            className="text-success"
            to={`/contestant/${contestant.contestant.id}`}
          >
            <h6>
              {contestant.contestant.first_name}{" "}
              {contestant.contestant.last_name}
            </h6>
          </Link>
        </div>
      </div>
      <div className=" row align-items-center">
        <div className="col-12 col-md-7">
          <div className="media">
            <img
              className="mr-3 align-self-start img-fluid"
              src={`/contestants/${contestant.contestant.id}.jpg`}
              alt="Contestant"
              onError={imageError}
              width="125"
            />
            <div className="media-body">
              <dl className="row">
                <dt className="col-sm-6">Best Rank</dt>
                <dd className="col-sm-6">{best_rank}</dd>
                <dt className="col-sm-6">Participations</dt>
                <dd className="col-sm-6">{participations}</dd>
              </dl>
            </div>
          </div>
        </div>
        {medals}
      </div>
    </li>
  );
};

export default ContestantListItem;

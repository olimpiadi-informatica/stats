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
  const picture = contestant.picture
    ? contestant.picture
    : "/user_placehoder.png";
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
    <li className="ContestantListItemContainer list-group-item ">
      <div className=" row align-items-center">
        <div className="col-1">
          <img src={picture} alt="Picture" className="img img-fluid" />
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-12">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-2">
                  <Link
                    className="text-success p-1"
                    to={`/contestant/${contestant.contestant.id}`}
                  >
                    {contestant.contestant.first_name}{" "}
                    {contestant.contestant.last_name}
                  </Link>
                </h5>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <dl className="row">
                <dt className="col-sm-3">Best Rank</dt>
                <dd className="col-sm-7">{best_rank}</dd>
                <dt className="col-sm-3">Participations</dt>
                <dd className="col-sm-7">{participations}</dd>
              </dl>
            </div>
            {medals}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContestantListItem;

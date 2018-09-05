import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const ContestantListItem = ({ contestant }) => {
  if (!contestant) return <div className="Loading">Loading ...</div>;

  const partecipations = _.map(
    contestant.participations,
    (partecipation, i) => {
      return <span key={contestant + i}>{partecipation.year} </span>;
    }
  );
  const best_rank = contestant.best_rank ? (
    <div>Best Rank : {contestant.best_rank}</div>
  ) : (
    <div />
  );

  return (
    <li className="ContestantListItemContainer list-group-item">
      <div className="align-items-center">
        <div>
          <Link to={`/contestant/${contestant.contestant.id}`}>
            {contestant.contestant.first_name} {contestant.contestant.last_name}
          </Link>
        </div>
        <div> partecipations : {partecipations}</div>
        <div>{best_rank}</div>
      </div>
    </li>
  );
};

export default ContestantListItem;

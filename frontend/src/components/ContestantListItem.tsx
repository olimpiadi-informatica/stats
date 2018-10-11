import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { ContestantItem } from "../remote/user";
import MedalsComponent from "./Medals";

type Props = {
  contestant: ContestantItem;
};

export default class ContestantListItem extends Component<Props> {
  render() {
    const { contestant } = this.props;

    const best_rank = contestant.best_rank || "N/a";
    const participations = contestant.participations.map((part, i) => (
      <span key={contestant.contestant.id + i}>
        <Link to={`/contest/${part.year}`}>[{part.year}] </Link>
      </span>
    ));
    const medals = {
      gold: { number: contestant.num_medals.gold, cutoff: 0 },
      silver: { number: contestant.num_medals.silver, cutoff: 0 },
      bronze: { number: contestant.num_medals.bronze, cutoff: 0 }
    };

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
              <Link to={`/contestant/${contestant.contestant.id}`}>
                <img
                  className="mr-3 align-self-start img-fluid"
                  src={`/contestants/${contestant.contestant.id}.jpg`}
                  alt="Contestant"
                  onError={(event: any) => {
                    event.target.src = "/placeholder.jpg";
                  }}
                  width="125"
                />
              </Link>
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
          <MedalsComponent medals={medals} cutoffs={false} />
        </div>
      </li>
    );
  }
}

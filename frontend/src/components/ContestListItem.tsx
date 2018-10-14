import React, { Component } from "react";
import { Link } from "react-router-dom";

import { round } from "../utils/math";
import { ContestItem } from "../remote/contest";
import MedalsComponent from "./Medals";

function imageError(event: any) {
  event.target.src = "/static/placeholder.jpg";
}

type Props = {
  contest: ContestItem;
};

export default class ContestListItem extends Component<Props> {
  render() {
    const contest = this.props.contest;
    const num_contestants = contest.num_contestants || "N/a";
    const max_score_possible = contest.max_score_possible || "N/a";
    const max_score = contest.max_score || "N/a";
    const avg_score = contest.avg_score ? round(contest.avg_score, 2) : "N/a";

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
              <Link to={`/contest/${contest.year}`}>
                <img
                  className="mr-3 align-self-start static/img-fluid"
                  src={`/static/contests/${contest.year}.jpg`}
                  alt="Contest"
                  onError={imageError}
                  width="125"
                />
              </Link>

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
            <MedalsComponent medals={contest.medals} cutoffs={false} />
          </div>
        </div>
      </li>
    );
  }
}

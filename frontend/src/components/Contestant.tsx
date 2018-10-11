import React, { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import _ from "lodash";

import Loading from "./Loading";
import { ContestantDetail, loadContestant } from "../remote/user";
import MedalsComponent from "./Medals";
import MedalIcon from "./MedalIcon";
import ScoreBadge from "./ScoreBadge";
import IOIBadge from "./IOIBadge";
import { round } from "../utils/math";

type Props = RouteComponentProps<any>;
type State = {
  contestant: ContestantDetail | null;
};

export default class ContestantContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { contestant: null };
  }

  async componentDidMount() {
    this.setState({ contestant: null });
    this.setState({
      contestant: await loadContestant(this.props.match.params.id)
    });
  }

  renderParticipations(contestant: ContestantDetail) {
    const num_cols = Math.max(
      ...contestant.participations.map(part => part.scores.length)
    );
    const participations_list = _.orderBy(
      contestant.participations,
      ["year"],
      ["desc"]
    ).map(part => {
      const { scores } = part;
      let problems = [];
      let final_score = null;
      for (const score of scores || []) {
        if (!score) continue;
        if (score.score !== null) {
          if (final_score === null) final_score = 0;
          final_score += score.score;
        }
        problems.push(
          <td key={`/task/${part.year}/${score.task}`}>
            <Link to={`/task/${part.year}/${score.task}`}>
              <ScoreBadge
                score={score.score}
                max_score={score.max_score_possible}
              />{" "}
              {score.task}
            </Link>
          </td>
        );
      }
      while (problems.length < num_cols)
        problems.push(<td key={part.year + problems.length} />);
      final_score = final_score === null ? "N/a" : round(final_score, 2);
      return (
        <tr key={part.year}>
          <th>
            <Link to={`/contest/${part.year}`}>{part.year}</Link>{" "}
            <IOIBadge ioi={part.ioi} />
          </th>
          <td>{part.rank || "N/a"}</td>
          <td>
            <MedalIcon color={part.medal} fontSize="25px" />
          </td>
          <td>{final_score}</td>
          {problems}
        </tr>
      );
    });
    return (
      <div>
        <h3 className="text-center m-3 text-danger">Participations</h3>
        <table className="table table-responsive-xs">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Rank</th>
              <th scope="col">Medal</th>
              <th scope="col">Score</th>
              <th colSpan={num_cols} className="text-center" scope="col">
                Tasks
              </th>
            </tr>
          </thead>
          <tbody>{participations_list}</tbody>
        </table>
      </div>
    );
  }

  render() {
    if (!this.state.contestant) return <Loading />;

    const { contestant } = this.state;
    const { id, first_name, last_name } = contestant.contestant;

    const best_rank =
      contestant.participations
        .map(part => part.rank)
        .reduce(
          (prev: number | null, curr) =>
            !prev ? curr : curr ? (prev < curr ? prev : curr) : prev,
          null
        ) || "N/a";
    let raw_medals = _.countBy(contestant.participations, "medal");
    const medals: any = {};
    let total_medals = 0;
    for (const color of ["gold", "silver", "bronze"]) {
      medals[color] = {
        number: raw_medals[color] || 0
      };
      total_medals += raw_medals[color] || 0;
    }

    return (
      <div>
        <div className="row p-2">
          <div className="col-12">
            <h2 className="text-center text-danger">
              {first_name} {last_name}
            </h2>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-7">
            <div className="media">
              <img
                className="mr-3 align-self-start img-fluid"
                src={`/contestants/${id}.jpg`}
                alt="Contestant"
                onError={(event: any) => {
                  event.target.src = "/placeholder.jpg";
                }}
                width="125"
              />
              <div className="media-body">
                <dl className="row">
                  <dt className="col-sm-6">Best Rank</dt>
                  <dd className="col-sm-6">{best_rank}</dd>
                  <dt className="col-sm-6">Total Medals</dt>
                  <dd className="col-sm-6">{total_medals}</dd>
                  <dt className="col-sm-6">Participations</dt>
                  <dd className="col-sm-6">
                    {contestant.participations.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 text-center">
            <MedalsComponent medals={medals} cutoffs={false} />
          </div>
          <div className="col-12 p-2">
            {this.renderParticipations(contestant)}
          </div>
        </div>
      </div>
    );
  }
}

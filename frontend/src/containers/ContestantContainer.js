import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchContestat } from "../actions/contestants";

class ContestantContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchContestat(id);
  }

  renderParticipations(participations) {
    if (!participations) return <div className="Loading">Loading ...</div>;
    const participations_list = _.map(participations, (participation, i) => {
      const medal = participation.medal ? (
        <div className={`${participation.medal} `}>
          <ion-icon name="medal" size="small" />
        </div>
      ) : (
        <div />
      );
      const rank = participation.rank ? participation.rank : "N/a";
      const year = participation.year ? participation.year : "N/a";

      const { scores } = participation;
      const problem_1 =
        scores && scores[0] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {" "}
              {scores[0].score}
            </span>{" "}
            {scores[0].task}
          </td>
        ) : (
          <td />
        );
      const problem_2 =
        scores && scores[1] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {scores[2].score}
            </span>{" "}
            {scores[1].task}{" "}
          </td>
        ) : (
          <td />
        );
      const problem_3 =
        scores && scores[2] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {scores[2].score}
            </span>{" "}
            {scores[2].task}{" "}
          </td>
        ) : (
          <td />
        );
      const problem_4 =
        scores && scores[3] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {scores[3].score}
            </span>{" "}
            {scores[3].task}{" "}
          </td>
        ) : (
          <td />
        );

      let final_score = 0;
      _.each(scores, score => {
        if (score.score) final_score += score.score;
      });

      return (
        <tr key={year}>
          <th scope="row">{year}</th>
          <td>{rank}</td>
          <td>{medal}</td>
          <td>{final_score}</td>
          {problem_1}
          {problem_2}
          {problem_3}
          {problem_4}
        </tr>
      );
    });

    // const max_scores = _.each(participations, participation => {});

    return (
      <div>
        <h3>Participations</h3>
        <table className="table table-striped table-responsive-xs">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Rank</th>
              <th scope="col">Medal</th>
              <th scope="col">Score</th>
              <th colSpan="4" className="text-center" scope="col">
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
    const { error } = this.props;
    if (error) return <div>{error}</div>;

    const contestant_main = this.props.contestant;
    if (!contestant_main) return <div className="Loading">Loading ...</div>;

    const { contestant } = this.props.contestant;
    const { participations } = this.props.contestant;

    if (!contestant || !participations)
      return <div className="Loading">Loading ...</div>;

    const best_rank = _.minBy(_.values(participations), "rank")
      ? _.minBy(_.values(participations), "rank").rank
      : "N/a";
    const number_participations = _.values(participations).length;
    const medals = _.countBy(_.values(participations), "medal");
    const num_golds = medals.gold ? medals.gold : 0;
    const num_silvers = medals.silver ? medals.silver : 0;
    const num_bronzes = medals.bronze ? medals.bronze : 0;
    const total_medals = num_golds + num_silvers + num_bronzes;
    return (
      <div className="row">
        <div className="col-12">
          <h2>
            {contestant.first_name} {contestant.last_name}
          </h2>
        </div>
        <div className="col-12 col-md-7">
          <dl className="row">
            <dt className="col-sm-5">Best Rank</dt>
            <dd className="col-sm-7">{best_rank}</dd>
            <dt className="col-sm-5">Total Medals</dt>
            <dd className="col-sm-7">{total_medals}</dd>
            <dt className="col-sm-5">Participations</dt>
            <dd className="col-sm-7">{number_participations}</dd>
          </dl>
        </div>
        <div className="col-12 col-md-5 align-items-center">
          <div className="gold d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{num_golds}</div>
          </div>
          <div className="silver d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{num_silvers}</div>
          </div>
          <div className="bronze d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{num_bronzes}</div>
          </div>
        </div>
        <div className="col-12">
          {this.renderParticipations(participations)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ contestants }, ownProps) {
  if (contestants && contestants.error) return { error: "Connection Error" };
  const id = ownProps.match.params.id;
  return { contestant: contestants[id] };
}

export default connect(
  mapStateToProps,
  { fetchContestat }
)(ContestantContainer);

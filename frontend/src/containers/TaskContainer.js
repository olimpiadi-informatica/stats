import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchTask } from "../actions/tasks";

class TaskContainer extends Component {
  componentDidMount() {
    const year = this.props.match.params.year;
    const name = this.props.match.params.name;
    this.props.fetchTask(year, name);
  }

  renderScores(scores) {
    if (!scores) return <div className="Loading" />;
    return _.map(scores, (score, i) => {
      const score_point = score.score ? <div>Score {score.score}</div> : "";
      const rank = score.rank ? <div>Rank {score.rank}</div> : "";
      return (
        <li key={i} className="list-group-item">
          <Link to={`/contestant/${score.contestant.id}`}>
            {score.contestant.first_name} {score.contestant.last_name}
          </Link>
          {score_point}
          {rank}
        </li>
      );
    });
  }

  renderRanking(scores) {
    if (!scores) return <div className="Loading" />;
    const scores_lists = _.map(scores, (score, i) => {
      console.log(score);
      const rank = score.rank ? score.rank : "N/a";
      const score_point = score.score ? score.score : "N/a";
      return (
        <tr key={score.contestant.id}>
          <th scope="row">{i + 1}</th>
          <td>
            <Link to={`/contestant/${score.contestant.id}`}>
              {score.contestant.first_name} {score.contestant.last_name}
            </Link>
          </td>
          <td>{score_point}</td>
          <td>{rank}</td>
        </tr>
      );
    });

    return (
      <div>
        <h3> Ranking </h3>
        <table className="table table-striped table-responsive-xs">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Contestant</th>
              <th scope="col">Score</th>
              <th scope="col">Rank in Contest</th>
            </tr>
          </thead>
          <tbody>{scores_lists}</tbody>
        </table>
      </div>
    );
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { task } = this.props;
    if (!task) return <div className="Loading">Loading ...</div>;
    const max_score_possible = task.max_score_possible
      ? task.max_score_possible
      : "N/a";
    const link = task.link ? <Link to={task.link}> {task.link} </Link> : "";
    const num_contestants = task.scores ? task.scores.length : "N/a";
    return (
      <div className="row p-2">
        <div className="col-12 title">
          <h2>{task.title}</h2>
        </div>
        <div className="col-12">
          <dl className="row">
            <dt className="col-sm-5">Try this Problem</dt>
            <dd className="col-sm-7">{link}</dd>
            <dt className="col-sm-5">Max possible score</dt>
            <dd className="col-sm-7">{max_score_possible}</dd>
            <dt className="col-sm-5">Number of Contestants</dt>
            <dd className="col-sm-7">{num_contestants}</dd>
          </dl>
        </div>
        <div className="col-12">{this.renderRanking(task.scores)}</div>
      </div>
    );
  }
}

function mapStateToProps({ tasks }, ownProps) {
  if (tasks && tasks.error) return { error: "Connection Error" };
  const year = ownProps.match.params.year;
  const name = ownProps.match.params.name;
  return { task: tasks[year + "-" + name] };
}

export default connect(
  mapStateToProps,
  { fetchTask }
)(TaskContainer);

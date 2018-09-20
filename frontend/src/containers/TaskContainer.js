import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchTask } from "../actions/tasks";
import { ContestantLink } from "../components";

class TaskContainer extends Component {
  componentDidMount() {
    const year = this.props.match.params.year;
    const name = this.props.match.params.name;
    this.props.fetchTask(year, name);
  }

  renderRanking(scores) {
    if (!scores) return <div className="Loading" />;
    const ordered_contests = _.sortBy(_.values(scores), function(o) {
      return o.rank;
    });
    const scores_lists = _.map(ordered_contests, (score, i) => {
      const rank = score.rank ? score.rank : "N/a";
      const score_point = score.score !== null ? score.score : "N/a";
      return (
        <tr key={score.contestant.id}>
          <th scope="row">{rank}</th>
          <td>
            <ContestantLink contestant={score.contestant} ioi={score.ioi} />
          </td>
          <td>{score_point}</td>
        </tr>
      );
    });

    return (
      <div>
        <h3 className="text-center p-2 text-danger"> Ranking </h3>
        <table className="table table-responsive-xs">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Contestant</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>{scores_lists}</tbody>
        </table>
      </div>
    );
  }

  imageError(event) {
    event.target.src = "/placeholder.jpg";
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { task } = this.props;
    if (!task) return <div className="Loading">Loading ...</div>;
    const max_score_possible = task.max_score_possible
      ? task.max_score_possible
      : "N/a";
    const link = task.link ? (
      <a target="_blank" href={task.link}>
        {" "}
        {task.link}{" "}
      </a>
    ) : (
      ""
    );
    const num_contestants = task.scores ? task.scores.length : "N/a";
    const image_src =
      task.navigation && task.navigation.current.name
        ? `/tasks/${task.navigation.current.name}-${
            task.navigation.current.year
          }.png`
        : "/tasks/notfound";
    return (
      <div>
        <div className="row p-2">
          <div className="col-12 ">
            <h2 className="title text-center text-danger">{task.title}</h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 col-md-7">
            <div className="media">
              <img
                className="mr-3 align-self-start img-fluid"
                src={image_src}
                alt="Task"
                onError={this.imageError.bind(this)}
                width="125"
              />
              <div className="media-body">
                <dl className="row">
                  <dt className="col-sm-6">Try this Problem</dt>
                  <dd className="col-sm-6">{link}</dd>
                  <dt className="col-sm-6">Max possible score</dt>
                  <dd className="col-sm-6">{max_score_possible}</dd>
                  <dt className="col-sm-6">Number of Contestants</dt>
                  <dd className="col-sm-6">{num_contestants}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">{this.renderRanking(task.scores)}</div>
        </div>
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

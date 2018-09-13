import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchTasks } from "../actions/tasks";
import { TaskListItem } from "../components";

class TasksContainer extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  renderTaskOfYear(tasks, year) {
    return _.map(tasks, task => {
      return (
        <TaskListItem key={`${task.name}${year}`} task={task} year={year} />
      );
    });
  }

  renderTasks(tasks) {
    if (!tasks) return <div className="Loading">Loading ...</div>;
    const tasks_list = _.map(tasks, (value, key) => {
      return <div key={key}>{this.renderTaskOfYear(value, key)}</div>;
    });
    return <ul className="list-group list-group-flush">{tasks_list}</ul>;
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { tasks } = this.props;
    if (!this.props.tasks) return <div className="Loading">Loading ...</div>;
    return (
      <div className="row p-2">
        <h2 className="col-12 title text-center">Tasks</h2>
        <div className="col-12">{this.renderTasks(tasks)}</div>
      </div>
    );
  }
}

function mapStateToProps({ tasks }) {
  if (tasks && tasks.error) return { error: "Connection Error" };
  let task_per_year = {};
  _.map(tasks, (value, key) => {
    if (!task_per_year[key.split("-")[0]])
      task_per_year[key.split("-")[0]] = [];
    task_per_year[key.split("-")[0]].push(value);
  });
  return { tasks: task_per_year };
}

export default connect(
  mapStateToProps,
  { fetchTasks }
)(TasksContainer);

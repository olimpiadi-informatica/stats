import React, { Component } from "react";
import _ from "lodash";

import { TaskYear, loadTasksList } from "../remote/task";
import Loading from "./Loading";
import Error from "./Error";
import TaskListItem from "./TaskListItem";

type Props = {};
type State = {
  tasks: TaskYear[] | null;
  error: XMLHttpRequest | null;
};

export default class Tasks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tasks: null, error: null };
  }

  async componentDidMount() {
    this.setState({ tasks: null });
    try {
      this.setState({ tasks: await loadTasksList(), error: null });
    } catch (error) {
      this.setState({ tasks: null, error: error.request });
    }
  }

  render() {
    if (this.state.error) return <Error error={this.state.error} />;
    if (!this.state.tasks) return <Loading />;

    const tasks = _.orderBy(this.state.tasks, ["year"], ["desc"]).map(({ year, tasks }) => {
      return _.orderBy(tasks, ["index"], ["asc"]).map(task => (
        <TaskListItem key={`${task.name}-${year}`} task={task} year={year} />
      ));
    });

    return (
      <div className="row p-2">
        <h2 className="col-12 title text-center text-danger">Tasks</h2>
        <div className="col-12">
          <ul className="list-group list-group-flush">{tasks}</ul>
        </div>
      </div>
    );
  }
}

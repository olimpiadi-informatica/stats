import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  StatsTask,
  TaskWithLowestAvgScore,
  TaskWithHighestAvgScore,
  TaskWithLowestMaxScore,
  TaskWithMostZeros,
  TaskWithMostFullscores,
} from "../../remote/home";
import { round } from "../../utils/math";

type Props = {
  stat: StatsTask;
};

export default class TaskTile extends Component<Props> {
  renderTaskName(task: { contest_year: number; name: string; title: string }) {
    return <Link to={`/task/${task.contest_year}/${task.name}`}>{task.title}</Link>;
  }

  renderTaskImg(task: { contest_year: number; name: string; title: string }) {
    return (
      <Link to={`/task/${task.contest_year}/${task.name}`}>
        <img
          className="card-img-top"
          src={`/static/tasks/${task.contest_year}/${task.name}.png`}
          alt={task.title}
          onError={(event: any) => {
            event.target.style = "display: none";
          }}
        />
      </Link>
    );
  }

  renderTaskWithLowestAvgScore(stat: TaskWithLowestAvgScore) {
    const task = stat.task_with_lowest_avg_score;
    return (
      <div>
        {this.renderTaskImg(task)}
        {this.renderTaskName(task)} is the task with the lowest average score, {round(task.avg_score, 2)} out of{" "}
        {task.max_score_possible}.
      </div>
    );
  }

  renderTaskWithHighestAvgScore(stat: TaskWithHighestAvgScore) {
    const task = stat.task_with_highest_avg_score;
    return (
      <div>
        {this.renderTaskImg(task)}
        {this.renderTaskName(task)} is the task with the highest average score, {round(task.avg_score, 2)} out of{" "}
        {task.max_score_possible}.
      </div>
    );
  }

  renderTaskWithLowestMaxScore(stat: TaskWithLowestMaxScore) {
    const task = stat.task_with_lowest_max_score;
    return (
      <div>
        {this.renderTaskImg(task)}
        {this.renderTaskName(task)} is one of the hardest task of its time, everyone scored less than{" "}
        {round(task.max_score, 2)} out of {task.max_score_possible}.
      </div>
    );
  }

  renderTaskWithMostZeros(stat: TaskWithMostZeros) {
    const task = stat.task_with_most_zeros;
    return (
      <div>
        {this.renderTaskImg(task)}
        {this.renderTaskName(task)} is one of the most challenging tasks, {task.num_zeros} students scored zero points.
      </div>
    );
  }

  renderTaskWithMostFullscores(stat: TaskWithMostFullscores) {
    const task = stat.task_with_most_fullscores;
    return (
      <div>
        {this.renderTaskImg(task)}
        {this.renderTaskName(task)} is one of the easiest tasks, {task.num_fullscores} students had full score.
      </div>
    );
  }

  render() {
    const { stat } = this.props;
    const kind = Object.keys(stat)[0];
    let body = null;
    if (kind == "task_with_lowest_avg_score") body = this.renderTaskWithLowestAvgScore(stat as TaskWithLowestAvgScore);
    else if (kind == "task_with_highest_avg_score")
      body = this.renderTaskWithHighestAvgScore(stat as TaskWithHighestAvgScore);
    else if (kind == "task_with_lowest_max_score")
      body = this.renderTaskWithLowestMaxScore(stat as TaskWithLowestMaxScore);
    else if (kind == "task_with_most_zeros") body = this.renderTaskWithMostZeros(stat as TaskWithMostZeros);
    else if (kind == "task_with_most_fullscores")
      body = this.renderTaskWithMostFullscores(stat as TaskWithMostFullscores);
    else return null;
    return (
      <div className="card border-info">
        <div className="card-text">{body}</div>
      </div>
    );
  }
}

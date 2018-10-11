import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { TaskListItem, ScoreBadge, ContestantLink } from "../components";
import { round } from "../utils/math";

function imageError(event) {
  event.target.src = "/placeholder.jpg";
}

function renderResults(contest, results) {
  if (!results) return <div className="Loading">Loading ...</div>;
  const array_contestants = _.values(results.results);
  const sorted_results = _(array_contestants)
    .chain()
    .flatten()
    .sortBy(function(contestant) {
      return contestant.rank;
    })
    .value();
  const tasks = contest.tasks;
  const contestants = _.map(sorted_results, contestant => {
    const medal = contestant.medal
      ? renderMedal(contestant.medal, contestant.medal, false)
      : "";
    const task_scores = contestant.scores;
    const scores = _.map(_.zip(tasks, task_scores), data => {
      const [task, score] = data;
      return (
        <td key={contestant.contestant.id + task.name}>
          <Link
            to={`/task/${contest.navigation.current}/${task.name}`}
            className=""
          >
            <ScoreBadge score={score} max_score={task.max_score_possible} />{" "}
            {task.name}
          </Link>
        </td>
      );
    });
    return (
      <tr key={contestant.contestant.id}>
        <th scope="row">{contestant.rank ? contestant.rank : "N/a"}</th>
        <td>
          <ContestantLink
            contestant={contestant.contestant}
            ioi={contestant.ioi}
          />
        </td>
        <td>{round(contestant.score, 2)}</td>
        {scores}
        <td className="text-center">{medal}</td>
        <td>
          <Link className="" to={`/region/${contestant.region}`}>
            {contestant.region}
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h3 className="text-center m-3  text-danger">Results</h3>
      <table className="table   table-responsive-xs">
        <thead className="bg-success text-white">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Contestant</th>
            <th scope="col">Score</th>
            <th scope="col" colSpan={tasks.length}>
              Tasks
            </th>
            <th className="text-center" scope="col">
              Medal
            </th>
            <th scope="col">Region</th>
          </tr>
        </thead>
        <tbody>{contestants}</tbody>
      </table>
    </div>
  );
}

function renderMedal(medal, type, expanded) {
  const medal_icon = expanded ? (
    <div className={`${type} d-inline-block p-4 text-center`}>
      <ion-icon name="medal" size="large" />
      <div>{medal[type].number}</div>
      <div className="border-top">{medal[type].cutoff} points</div>
    </div>
  ) : (
    <div className={`${type} `}>
      <ion-icon name="medal" size="small" />
    </div>
  );
  return medal_icon;
}

function renderMedals(medals) {
  if (!medals) return <div className="Loading">Loading ...</div>;
  const gold_cutoff = medals.gold.cutoff ? (
    <div className="border-top">{medals.gold.cutoff} points</div>
  ) : (
    <div />
  );
  const silver_cutoff = medals.silver.cutoff ? (
    <div className="border-top">{medals.silver.cutoff} points</div>
  ) : (
    <div />
  );
  const bronze_cutoff = medals.bronze.cutoff ? (
    <div className="border-top">{medals.bronze.cutoff} points</div>
  ) : (
    <div />
  );
  return (
    <div>
      <div className="gold d-inline-block p-4 text-center">
        <ion-icon name="medal" size="large" />
        <div>{medals.gold.number}</div>
        {gold_cutoff}
      </div>
      <div className="silver d-inline-block p-4 text-center">
        <ion-icon name="medal" size="large" />
        <div>{medals.silver.number}</div>
        {silver_cutoff}
      </div>
      <div className="bronze d-inline-block p-4 text-center">
        <ion-icon name="medal" size="large" />
        <div>{medals.bronze.number}</div>
        {bronze_cutoff}
      </div>
    </div>
  );
}

function renderTasks(tasks, year) {
  if (!tasks) return <div className="Loading">Loading ...</div>;
  const tasks_list = _.map(tasks, task => {
    return <TaskListItem key={task.name} task={task} year={year} />;
  });
  return (
    <div>
      <h3 className="text-center m-3 text-danger">Tasks</h3>
      <div className="row">
        <div className="col-12">
          <ul className="list-group list-group-flush">{tasks_list}</ul>
        </div>
      </div>
    </div>
  );
}

function renderInfo(contest) {
  if (!contest) return <div className="Loading">Loading ...</div>;
  const num_contestants = contest.num_contestants
    ? contest.num_contestants
    : "N/a";
  const max_score_possible = contest.max_score_possible
    ? contest.max_score_possible
    : "N/a";
  const max_score = contest.max_score ? contest.max_score : "N/a";
  const avg_score = contest.avg_score ? contest.avg_score.toFixed(2) : "N/a";

  return (
    <div className="media m-3">
      <img
        className="mr-3 align-self-start img-fluid"
        src={`/contests/${contest.navigation.current}.jpg`}
        alt="Contest"
        onError={imageError}
        width="125"
      />
      <div className="media-body">
        <dl className="row">
          <dt className="col-sm-6 ">Contestants</dt>
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
  );
}

const ContestItem = ({ contest, results }) => {
  if (!contest) return <div className="Loading">Loading ...</div>;
  return (
    <div className="row align-items-center">
      <div className="col-12 col-md-7">{renderInfo(contest)}</div>
      <div className="col-12 col-md-5">{renderMedals(contest.medals)}</div>
      <div className="col-12">
        {renderTasks(contest.tasks, contest.navigation.current)}
      </div>
      <div className="col-12">{renderResults(contest, results)}</div>
    </div>
  );
};

export default ContestItem;

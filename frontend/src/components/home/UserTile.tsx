import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Contestant } from "../../remote/index";
import {
  StatsUser,
  BestStudent,
  WinAtFirstParticipation,
  StudentWithMostParticipations,
  IOIstWithWorstRank
} from "../../remote/home";
import Medals from "../Medals";

type Props = {
  stat: StatsUser;
};

export default class UserTile extends Component<Props> {
  renderContestant(contestant: Contestant) {
    return (
      <Link to={`/contestant/${contestant.id}`}>
        {contestant.first_name} {contestant.last_name}
      </Link>
    );
  }

  renderContestantImg(contestant: Contestant) {
    return (
      <Link to={`/contestant/${contestant.id}`}>
        <img
          className="card-img-top"
          src={`/contestants/${contestant.id}.jpg`}
          alt={`${contestant.first_name} ${contestant.last_name}`}
          onError={(event: any) => {
            event.target.style = "display: none";
          }}
        />
      </Link>
    );
  }

  renderBestStudent(stat: BestStudent) {
    const { contestant, num_medals } = stat.best_student;
    const medals = {
      gold: { number: num_medals.gold, cutoff: null },
      silver: { number: num_medals.silver, cutoff: null },
      bronze: { number: num_medals.bronze, cutoff: null }
    };
    return (
      <div>
        {this.renderContestantImg(contestant)}
        The student that won the most is {this.renderContestant(contestant)}
        <div className="row text-center">
          <div className="col-12 align-items-center">
            <Medals medals={medals} cutoffs={false} />
          </div>
        </div>
      </div>
    );
  }

  renderWinAtFirstParticipation(stat: WinAtFirstParticipation) {
    const { contestant, year } = stat.win_at_first_participation;
    return (
      <div>
        {this.renderContestantImg(contestant)}
        {this.renderContestant(contestant)} won the {year} edition, at first
        try!
      </div>
    );
  }

  renderStudentWithMostParticipations(stat: StudentWithMostParticipations) {
    const {
      contestant,
      num_participations
    } = stat.student_with_most_participations;
    return (
      <div>
        {this.renderContestantImg(contestant)}
        {this.renderContestant(contestant)} is the student that did the highest
        number of national competitions, {num_participations}!
      </div>
    );
  }

  renderIOIstWithWorstRank(stat: IOIstWithWorstRank) {
    const { contestant, contest_year, rank } = stat.ioist_with_worst_rank;
    return (
      <div>
        {this.renderContestantImg(contestant)}
        In {contest_year}, {this.renderContestant(contestant)} went to IOI even
        if he arrived at {rank} place at the national competition.
      </div>
    );
  }

  render() {
    const { stat } = this.props;
    const kind = Object.keys(stat)[0];
    let body = null;
    if (kind == "best_student")
      body = this.renderBestStudent(stat as BestStudent);
    if (kind == "win_at_first_participation")
      body = this.renderWinAtFirstParticipation(
        stat as WinAtFirstParticipation
      );
    else if (kind == "student_with_most_participations")
      body = this.renderStudentWithMostParticipations(
        stat as StudentWithMostParticipations
      );
    else if (kind == "ioist_with_worst_rank")
      body = this.renderIOIstWithWorstRank(stat as IOIstWithWorstRank);
    else return null;
    return (
      <div className="card border-danger">
        <div className="card-text">{body}</div>
      </div>
    );
  }
}

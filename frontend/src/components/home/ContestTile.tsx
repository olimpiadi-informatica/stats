import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import {
  StatsContest,
  ContestWithMostParticipants,
  ContestWithMostExAequo,
  MostNorthenContest,
  MostSouthernContest,
  NumBoysGirls,
  NumParticipantsPerYear,
  MostUsedLocation
} from "../../remote/home";
import { ContestLocation } from "../../remote/contest";
import SimpleMap from "../graphs/SimpleMap";

type Props = {
  stat: StatsContest;
};

export default class ContestTile extends Component<Props> {
  renderContestImg(year: number) {
    return (
      <Link to={`/contest/${year}`}>
        <img
          className="card-img-top"
          src={`/static/contests/${year}.jpg`}
          alt={`${year}`}
          onError={(event: any) => {
            event.target.style = "display: none";
          }}
        />
      </Link>
    );
  }

  renderContestLink(year: number) {
    return <Link to={`/contest/${year}`}>{year}</Link>;
  }

  renderLocation(location: ContestLocation) {
    if (location.latitude === null || location.longitude === null) return null;
    return <SimpleMap markers={[[location.latitude, location.longitude]]} />;
  }

  renderContestWithMostParticipants(stat: ContestWithMostParticipants) {
    const { year, num_participants } = stat.contest_with_most_participants;
    return (
      <div>
        {this.renderContestImg(year)}
        The {this.renderContestLink(year)} competition registered the highest
        number of contestants, {num_participants}!
      </div>
    );
  }

  renderContestWithMostExAequo(stat: ContestWithMostExAequo) {
    const { year, num_ex_aequo } = stat.contest_with_most_ex_aequo;
    return (
      <div>
        {this.renderContestImg(year)}
        {num_ex_aequo} is the highest number of ex-aequo, in{" "}
        {this.renderContestLink(year)} all those students ended at the first
        place with the same score!
      </div>
    );
  }

  renderMostNorthenContest(stat: MostNorthenContest) {
    const { year, location } = stat.most_northern_contest;
    return (
      <div>
        {this.renderLocation(location)}
        The most northern contest was held in {this.renderContestLink(
          year
        )} in {location.location}.
      </div>
    );
  }

  renderMostSouthernContest(stat: MostSouthernContest) {
    const { year, location } = stat.most_southern_contest;
    return (
      <div>
        {this.renderLocation(location)}
        The most southern contest was held in {this.renderContestLink(
          year
        )} in {location.location}.
      </div>
    );
  }

  renderNumBoysGirls(stat: NumBoysGirls) {
    return (
      <AreaChart
        width={300}
        height={350}
        data={stat.num_boys_girls.years}
        className="card-img-top"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis width={30} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="num_boys"
          stackId="1"
          stroke="#99ebff"
          fill="#99ebff"
          name="Boys"
        />
        <Area
          type="monotone"
          dataKey="num_girls"
          stackId="1"
          stroke="#ffb3cb"
          fill="#ffb3cb"
          name="Girls"
        />
      </AreaChart>
    );
  }

  renderNumParticipantsPerYear(stat: NumParticipantsPerYear) {
    return (
      <AreaChart
        width={300}
        height={350}
        data={stat.num_participants_per_year.years}
        className="card-img-top"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis width={30} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="num_participants"
          stackId="1"
          stroke="#226600"
          fill="#4ce600"
          name="Participants"
        />
      </AreaChart>
    );
  }

  renderMostUsedLocation(stat: MostUsedLocation) {
    const { location, years } = stat.most_used_location;
    const years_but_last = years
      .slice(0, -2)
      .map(year => (
        <span key={`most-used-location-${year}`}>
          {this.renderContestLink(year)},{" "}
        </span>
      ));
    years_but_last.push(
      <span key={`most-used-location-${years[years.length - 2]}`}>
        {this.renderContestLink(years[years.length - 2])}
      </span>
    );
    return (
      <div>
        {this.renderLocation(location)}
        {location.location} is the most used location, it has beed used{" "}
        {years.length} times, in {years_but_last} and{" "}
        {this.renderContestLink(years[years.length - 1])}.
      </div>
    );
  }

  render() {
    const { stat } = this.props;
    const kind = Object.keys(stat)[0];
    let body = null;
    if (kind == "contest_with_most_participants")
      body = this.renderContestWithMostParticipants(
        stat as ContestWithMostParticipants
      );
    else if (kind == "contest_with_most_ex_aequo")
      body = this.renderContestWithMostExAequo(stat as ContestWithMostExAequo);
    else if (kind == "most_northern_contest")
      body = this.renderMostNorthenContest(stat as MostNorthenContest);
    else if (kind == "most_southern_contest")
      body = this.renderMostSouthernContest(stat as MostSouthernContest);
    else if (kind == "num_boys_girls")
      body = this.renderNumBoysGirls(stat as NumBoysGirls);
    else if (kind == "num_participants_per_year")
      body = this.renderNumParticipantsPerYear(stat as NumParticipantsPerYear);
    else if (kind == "most_used_location")
      body = this.renderMostUsedLocation(stat as MostUsedLocation);
    else return null;
    return (
      <div className="card border-success">
        <div className="card-text">{body}</div>
      </div>
    );
  }
}

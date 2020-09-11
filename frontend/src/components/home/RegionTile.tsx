import React, { Component } from "react";
import { Link } from "react-router-dom";
import { round } from "../../utils/math";

import {
  StatsRegion,
  RegionWithMostMedals,
  RegionWithMostMedalsPerParticipant,
  RegionWithMostFirstPlaces,
  RegionWithMostParticipants,
} from "../../remote/home";
import RegionsSVG from "../regions/Regions";

type Props = {
  stat: StatsRegion;
};

export default class RegionTile extends Component<Props> {
  renderRegionLink(region: { id: string; name: string }) {
    return <Link to={`/region/${region.id}`}>{region.name}</Link>;
  }

  renderRegionImg(region: { id: string; name: string }) {
    const SVG = RegionsSVG[region.id];
    return (
      <Link to={`/region/${region.id}`}>
        <SVG className="mr-3 align-self-start img-fluid region" preserveAspectRatio="xMidYMid" />
      </Link>
    );
  }

  renderRegionWithMostMedals(region: RegionWithMostMedals) {
    const { first, second } = region.region_with_most_medals;
    return (
      <div>
        {this.renderRegionImg(first)}
        The region that wont the highest number of medals is {this.renderRegionLink(first)} with {first.num_medals.gold}{" "}
        golds, {first.num_medals.silver} silvers and {first.num_medals.bronze} bronzes. At second place there is{" "}
        {this.renderRegionLink(second)} with respectivly {second.num_medals.gold}, {second.num_medals.silver} and{" "}
        {second.num_medals.bronze}.
      </div>
    );
  }

  renderRegionWithMostMedalsPerParticipant(stat: RegionWithMostMedalsPerParticipant) {
    const region = stat.region_with_most_medals_per_participant;
    return (
      <div>
        {this.renderRegionImg(region)}
        The region that won the highest number of medals per participant is {this.renderRegionLink(region)},{" "}
        {round(region.medals_per_participant * 100, 2)}% of the students won a medal.
      </div>
    );
  }

  renderRegionWithMostFirstPlaces(stat: RegionWithMostFirstPlaces) {
    const region = stat.region_with_most_first_places;
    return (
      <div>
        {this.renderRegionImg(region)}
        The region with the highest number of first places is {this.renderRegionLink(region)}, with{" "}
        {region.num_first_places}.
      </div>
    );
  }

  renderRegionWithMostParticipants(stat: RegionWithMostParticipants) {
    const region = stat.region_with_most_participants;
    return (
      <div>
        {this.renderRegionImg(region)}
        The region with the highest number of participants is {this.renderRegionLink(region)}, with{" "}
        {region.num_participants}.
      </div>
    );
  }

  render() {
    const { stat } = this.props;
    const kind = Object.keys(stat)[0];
    let body = null;
    if (kind === "region_with_most_medals") body = this.renderRegionWithMostMedals(stat as RegionWithMostMedals);
    else if (kind === "region_with_most_medals_per_participant")
      body = this.renderRegionWithMostMedalsPerParticipant(stat as RegionWithMostMedalsPerParticipant);
    else if (kind === "region_with_most_first_places")
      body = this.renderRegionWithMostFirstPlaces(stat as RegionWithMostFirstPlaces);
    else if (kind === "region_with_most_participants")
      body = this.renderRegionWithMostParticipants(stat as RegionWithMostParticipants);
    else return null;
    return (
      <div className="card border-primary">
        <div className="card-text">{body}</div>
      </div>
    );
  }
}

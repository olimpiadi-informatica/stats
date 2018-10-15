import React, { Component } from "react";

import { ContestMedalInfo } from "../remote/contest";
import MedalIcon from "./MedalIcon";

type Props = {
  medals: ContestMedalInfo;
  cutoffs: boolean;
};

export default class Medals extends Component<Props> {
  render() {
    const { cutoffs } = this.props;
    return (
      <div>
        <div className="text-center d-inline-block p-2">
          <MedalIcon color="gold" />
          <div>{this.props.medals.gold.number}</div>
          {cutoffs ? this.props.medals.gold.cutoff : ""}
        </div>
        <div className="text-center d-inline-block p-2">
          <MedalIcon color="silver" />
          <div>{this.props.medals.silver.number}</div>
          {cutoffs ? this.props.medals.silver.cutoff : ""}
        </div>
        <div className="text-center d-inline-block p-2">
          <MedalIcon color="bronze" />
          <div>{this.props.medals.bronze.number}</div>
          {cutoffs ? this.props.medals.bronze.cutoff : ""}
        </div>
      </div>
    );
  }
}

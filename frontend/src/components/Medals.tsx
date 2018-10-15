import React, { Component } from "react";

import MedalIcon from "./MedalIcon";

type Props = {
  medals: { gold: number | null; silver: number | null; bronze: number | null };
  cutoffs: { gold: number | null; silver: number | null; bronze: number | null };
  showCutoffs: boolean;
};

export default class Medals extends Component<Props> {
  static defaultProps = { showCutoffs: false, cutoffs: { gold: null, silver: null, bronze: null } };

  render() {
    const { medals, cutoffs, showCutoffs } = this.props;
    return (
      <div>
        <div className="text-center d-inline-block p-2">
          <MedalIcon color="gold" />
          <div>{medals.gold || 0}</div>
          {showCutoffs ? cutoffs.gold : ""}
        </div>
        <div className="text-center d-inline-block p-2">
          <MedalIcon color="silver" />
          <div>{medals.silver || 0}</div>
          {showCutoffs ? cutoffs.silver : ""}
        </div>
        <div className="text-center d-inline-block p-2">
          <MedalIcon color="bronze" />
          <div>{medals.bronze || 0}</div>
          {showCutoffs ? cutoffs.bronze : ""}
        </div>
      </div>
    );
  }
}

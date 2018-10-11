import React, { Component } from "react";

import { round } from "../utils/math";

const COLORS = [
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#FFCC00",
  "#41ab5d",
  "#66c2a5",
  "#3288bd"
];

type Props = {
  score: number | null | undefined;
  max_score: number | null | undefined;
};

export default class ScoreBadge extends Component<Props> {
  render() {
    let { score, max_score } = this.props;

    if (score === null || score === undefined) return <span />;
    if (!max_score) max_score = score;
    const frac = score / max_score;
    const index = Math.round(frac * (COLORS.length - 1));
    return (
      <span
        className="badge badge-pill score-badge"
        style={{
          border: "none",
          color: COLORS[index]
        }}
      >
        {" "}
        {round(score, 2)}
      </span>
    );
  }
}

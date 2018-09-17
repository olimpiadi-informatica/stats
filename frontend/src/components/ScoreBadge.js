import React from "react";

const COLORS = [
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#FFCC00",
  "#41ab5d",
  "#66c2a5",
  "#3288bd"
  // "#FF0000",
  // "#FF3300",
  // "#FF6600",
  // "#FF9900",
  // "#FFCC00",
  // "#FFFF00",
  // "#CCFF00",
  // "#99FF00",
  // "#66FF00",
  // "#33FF00",
  // "#00FF00"
];

const ScoreBadge = ({ score, max_score }) => {
  if (score === null) return <span />;
  if (!max_score) max_score = score;
  const frac = score / max_score;
  const index = Math.round(frac * (COLORS.length - 1));
  return (
    <span
      className="badge badge-pill"
      style={{
        // border: "1px solid black",
        border: "none",
        // background: '#ededed',
        color: COLORS[index]
        // textShadow: "0px 0px 2px black"
      }}
    >
      {" "}
      {score}
    </span>
  );
};

export default ScoreBadge;

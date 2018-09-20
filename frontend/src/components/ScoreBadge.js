import React from "react";

const COLORS = [
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#FFCC00",
  "#41ab5d",
  "#66c2a5",
  "#3288bd"
];

const ScoreBadge = ({ score, max_score }) => {
  if (score === null) return <span />;
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
      {score}
    </span>
  );
};

export default ScoreBadge;

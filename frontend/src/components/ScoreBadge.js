import React from "react";

const COLORS = [
  "#FF0000",
  "#FF3300",
  "#FF6600",
  "#FF9900",
  "#FFCC00",
  "#FFFF00",
  "#CCFF00",
  "#99FF00",
  "#66FF00",
  "#33FF00",
  "#00FF00"
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
        border: "1px solid black",
        background: COLORS[index],
        color: "black",
        textShadow: "0px 0px 3px white"
      }}
    >
      {" "}
      {score}
    </span>
  );
};

export default ScoreBadge;

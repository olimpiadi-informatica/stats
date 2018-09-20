import React from "react";
import { Link } from "react-router-dom";

const ContestantLink = ({ contestant, ioi = false }) => {
  if (!contestant) return <span />;
  const ioi_badge = ioi ? (
    <span className="badge badge-pill badge-success">IOI</span>
  ) : (
    <span />
  );
  return (
    <Link className="" to={`/contestant/${contestant.id}`}>
      {contestant.first_name} {contestant.last_name} {ioi_badge}
    </Link>
  );
};

export default ContestantLink;

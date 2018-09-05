import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const RegionListItem = ({ region }) => {
  if (!region) return <div className="Loading">Loading ...</div>;

  const avg_contestants_per_year = region.avg_contestants_per_year ? (
    <div>avg_contestants_per_year {region.avg_contestants_per_year}</div>
  ) : (
    <div />
  );
  return (
    <li className="RegionListItemContainer list-group-item">
      <div className="align-items-center">
        <Link to={`/region/${region.id}`}>{region.name}</Link>
        <div>{avg_contestants_per_year}</div>
      </div>
    </li>
  );
};

export default RegionListItem;

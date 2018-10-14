import React, { Component } from "react";
import { Link } from "react-router-dom";

import { RegionItem } from "../remote/region";
import { round } from "../utils/math";
import Medals from "./Medals";
import RegionsSVG from "./regions/Regions";

type Props = {
  region: RegionItem;
};

export default class RegionListItem extends Component<Props> {
  render() {
    const { region } = this.props;

    const avg_contestants_per_year = region.avg_contestants_per_year
      ? round(region.avg_contestants_per_year, 2)
      : "N/a";

    const medals = {
      gold: { number: region.medals.gold, cutoff: 0 },
      silver: { number: region.medals.silver, cutoff: 0 },
      bronze: { number: region.medals.bronze, cutoff: 0 }
    };

    const SVG = RegionsSVG[region.id];
    const origWidth = SVG({}).props.width;
    const width = 50;
    const scale = width / origWidth;
    console.log(scale);

    return (
      <li className="RegionListItemContainer list-group-item">
        <div className=" row">
          <div className="col-12">
            <Link className="text-success" to={`/region/${region.id}`}>
              <h6>{region.name}</h6>
            </Link>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-7">
            <div className="media">
              <Link
                to={`/region/${region.id}`}
                style={{
                  width: "100px",
                  marginRight: "10px"
                }}
              >
                <SVG
                  className="mr-3 align-self-start img-fluid"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMaxYMax meet"
                />
              </Link>
              <div className="media-body">
                <dl className="row">
                  <dt className="col-sm-6">Avg Contestants per Year</dt>
                  <dd className="col-sm-6">{avg_contestants_per_year}</dd>
                  <dt className="col-sm-6">Number of Contestants</dt>
                  <dd className="col-sm-6">
                    {region.num_contestants || "N/a"}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 align-items-center text-center">
            <Medals medals={medals} cutoffs={false} />
          </div>
        </div>
      </li>
    );
  }
}

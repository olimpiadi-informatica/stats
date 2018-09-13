import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchRegions } from "../../actions/regions";

function flipCoin(number_of_cards) {
  return Math.floor(Math.random() * number_of_cards);
}

function generateBodyCard(coin) {
  if (coin === 0) {
    return (
      <div>
        <p className="card-text">
          Veneto is the region that has brought the greatest number of athletes
          to the competition, exactly 179, eight more than Lombardy
        </p>
        <Link
          to={"/region/VEN"}
          className="card-link btn btn-outline-danger text-danger btn-block"
        >
          More
        </Link>
      </div>
    );
  } else if (coin === 1) {
    return (
      <div>
        <div className="card-text ">
          Lombardy is the region that has won the most medals, 89, and the
          highest number of gold medals, 19.
        </div>
        <div className="row text-center">
          <div className="col-12 align-items-center">
            <div className="gold d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">19</div>
            </div>
            <div className="silver d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">29</div>
            </div>
            <div className="bronze d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">41</div>
            </div>
          </div>
        </div>
        <Link
          to={"/region/LOM"}
          className="card-link btn btn-outline-danger text-danger btn-block"
        >
          More
        </Link>
      </div>
    );
  }
  if (coin === 2) {
  } else {
    return <div />;
  }
}

function generateImageCard(coin) {
  if (coin === 0) {
    return (
      <img className="card-img-top" src="/regions/veneto.png" alt="Veneto" />
    );
  } else if (coin === 1) {
    return (
      <img
        className="card-img-top"
        src="/regions/lombardia.png"
        alt="Lombardia"
      />
    );
  } else if (coin === 2) {
    return <span />;
  } else {
    return <span />;
  }
}
class RegionCard extends Component {
  componentDidMount() {
    this.props.fetchRegions();
  }
  render() {
    const coin = flipCoin(2);
    return (
      <div className="card border-danger">
        {generateImageCard(coin)}
        <div className="card-body">{generateBodyCard(coin)}</div>
      </div>
    );
  }
}

function medalsContestants(regions) {
  if (!regions) return [];
  let regionMA = [];
  _.map(regions, region => {
    const { medals } = region;
    const total_medals = medals.gold + medals.silver + medals.bronze;
    regionMA.push({
      region: region.id,
      ma: Math.round(total_medals / region.num_contestants)
    });
  });
  return regionMA;
}

function mapStateToProps(state) {
  if (state.regions && state.regions.error) {
    return { error: "Connection Error" };
  }
  return { ma: state.regions };
}

export default connect(
  mapStateToProps,
  { fetchRegions }
)(RegionCard);

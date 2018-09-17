import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          Lombardy is the region that has brought the greatest number of
          athletes to the competition, exactly 219, seven more than Veneto
        </p>
        <Link
          to={"/region/LOM"}
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
          Lombardy is the region that has won the most medals, 114, and the
          highest number of gold medals, 21.
        </div>
        <div className="row text-center">
          <div className="col-12 align-items-center">
            <div className="gold d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">21</div>
            </div>
            <div className="silver d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">38</div>
            </div>
            <div className="bronze d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">55</div>
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
  } else if (coin === 2) {
    return (
      <div>
        <div className="card-text ">
          40% of the medals won by the Abbruzzo region are gold medals, three
          won by Andrea Ciprietti and one by William Di Luigi
        </div>
        <div className="row text-center">
          <div className="col-12 align-items-center">
            <div className="gold d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">4</div>
            </div>
            <div className="silver d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">2</div>
            </div>
            <div className="bronze d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">4</div>
            </div>
          </div>
        </div>
        <Link
          to={"/region/ABR"}
          className="card-link btn btn-outline-danger text-danger btn-block"
        >
          More
        </Link>
      </div>
    );
  } else {
    return <div />;
  }
}

function generateImageCard(coin) {
  if (coin === 0) {
    return (
      <img
        className="card-img-top"
        src="/regions/Lombardia.png"
        alt="Lombardia"
      />
    );
  } else if (coin === 1) {
    return (
      <img
        className="card-img-top"
        src="/regions/Lombardia.png"
        alt="Lombardia"
      />
    );
  } else if (coin === 2) {
    return (
      <img className="card-img-top" src="/regions/Abruzzo.png" alt="Abruzzo" />
    );
  } else {
    return <span />;
  }
}
class RegionCard extends Component {
  componentDidMount() {
    this.props.fetchRegions();
  }
  render() {
    const coin = flipCoin(3);
    return (
      <div className="card border-danger">
        {generateImageCard(coin)}
        <div className="card-body">{generateBodyCard(coin)}</div>
      </div>
    );
  }
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

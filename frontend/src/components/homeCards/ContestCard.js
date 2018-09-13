import React from "react";
import { Link } from "react-router-dom";

function flipCoin(number_of_cards) {
  return Math.floor(Math.random() * number_of_cards);
}

function generateBodyCard(coin) {
  if (coin === 0) {
    return (
      <div>
        <p className="card-text">
          During the edition held in 2015 at the Istituto Caduti Direttissima in
          Castiglione dei Pepoli, six athletes finished the competition with
          full scores. The average score was one of the highest, 131.94 points
        </p>
        <Link
          to={"/contest/2015"}
          className="card-link btn btn-outline-danger text-danger btn-block"
        >
          More
        </Link>
      </div>
    );
  } else if (coin === 1) {
    return <div />;
  }
  if (coin === 2) {
  } else {
    return <div />;
  }
}

function generateImageCard(coin) {
  if (coin === 0) {
    return <img className="card-img-top" src="/oii_2015.jpg" alt="OII 2015" />;
  } else if (coin === 1) {
    return <span />;
  } else if (coin === 2) {
    return <span />;
  } else {
    return <span />;
  }
}

function ContestCard() {
  const coin = flipCoin(1);
  return (
    <div className="card border-success">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default ContestCard;

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
          Durante l'edizione svoltasi nel 2015 presso Istituto Caduti
          Direttissima a Castiglione dei Pepoli, furono sei gli atleti che
          terminarono la gara facendo full score. Il punteggio medio fu uno dei
          più alti, 131.94 punti.
        </p>
        <Link to={"/contest/2015"} className="card-link">
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
    <div className="card">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default ContestCard;

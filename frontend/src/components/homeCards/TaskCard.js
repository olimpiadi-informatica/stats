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
          <strong>Stanza degli specchi</strong> è uno dei task più difficile che
          è mai apparso ad una olimpiade. Nessun atleta è riuscito ad ottenere
          il punteggio massimo di 100 punti. Solo quattro atleti sono riusciti
          ad ottenere 80 punti.
        </p>
        <Link to={"/task/2017/specchi"} className="card-link">
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
    return (
      <img className="card-img-top" src="/mirror_room.png" alt="Mirror Room" />
    );
  } else if (coin === 1) {
    return <span />;
  } else if (coin === 2) {
    return <span />;
  } else {
    return <span />;
  }
}

function TaskCard() {
  const coin = flipCoin(1);
  return (
    <div className="card">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default TaskCard;

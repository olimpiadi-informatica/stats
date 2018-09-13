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
          Mirror Room is one of the most difficult tasks that has ever appeared
          at an Olympics. No athlete was able to get the maximum score of 100
          points. Only four athletes managed to get 80 points.
        </p>
        <Link
          to={"/task/2017/specchi"}
          className="card-link btn btn-outline-primary btn-block"
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
    <div className="card border-primary">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default TaskCard;

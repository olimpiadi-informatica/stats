import React from "react";
import { Link } from "react-router-dom";

function flipCoin(number_of_cards) {
  return Math.floor(Math.random() * number_of_cards);
}

function generateBodyCard(coin) {
  console.log(coin);
  if (coin === 0) {
    return (
      <div className="card-text">
        The eighteenth edition of the Italian Olympics of Informatics were held
        at ITI G. Marconi Campobasso from 13 to 15/09/2018.
      </div>
    );
  } else if (coin === 1) {
    return (
      <div>
        <div className="card-text">
          Federico Stazi won the 2018 edition of the Olympics with 276.22 points
        </div>
        <Link
          to={"/contestant/5ccb69a5226460df52be9a3ebebd6a1f"}
          className="card-link btn btn-outline-primary  text-success btn-block"
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
        src="/oii_campobasso.jpg"
        alt="Campobasso OII"
      />
    );
  } else if (coin === 1) {
    return (
      <img
        className="card-img-top"
        src="/contestants/5ccb69a5226460df52be9a3ebebd6a1f.jpg"
        alt="Federico Stazi"
      />
    );
  } else {
    return <span />;
  }
}

function NewsCard() {
  const coin = flipCoin(2);
  return (
    <div className="card border-success">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default NewsCard;

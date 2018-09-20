import React from "react";

function flipCoin(number_of_cards) {
  return Math.floor(Math.random() * number_of_cards);
}

function generateBodyCard(coin) {
  console.log(coin);
  if (coin === 0) {
    return (
      <div className="card-text">
        During the 2018 editions, two participants with the same name, Lorenzo
        Rossi, both from the same region, Emilia Romagna, won the same medal,
        silver.
      </div>
    );
  } else {
    return <div />;
  }
}

function generateImageCard(coin) {
  if (coin === 0) {
    return (
      <img className="card-img-top" src="/curiosity1.png" alt="Lorenzi Rossi" />
    );
  } else {
    return <span />;
  }
}

function CuriosityCard() {
  const coin = flipCoin(1);
  return (
    <div className="card border-success">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default CuriosityCard;

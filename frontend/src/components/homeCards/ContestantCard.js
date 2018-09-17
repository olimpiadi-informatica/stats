import React from "react";
import { Link } from "react-router-dom";

function flipCoin(number_of_cards) {
  return Math.floor(Math.random() * number_of_cards);
}

function generateBodyCard(coin) {
  if (coin === 0) {
    return (
      <div>
        <div className="card-text">
          Andrea Ciprietti is the most successful athlete in the history of the
          Italian Olympics. In four competitions it has conquered 3 gold and 1
          silver
          <div className="row text-center">
            <div className="col-12 align-items-center">
              <div className="gold d-inline-block p-2">
                <ion-icon name="medal" size="large" />
                <div className="text-center">3</div>
              </div>
              <div className="silver d-inline-block p-2">
                <ion-icon name="medal" size="large" />
                <div className="text-center">1</div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={"/contestant/8406cc432799527748f821a8d3b61be8"}
          className="card-link btn btn-outline-success text-success btn-block"
        >
          More
        </Link>
      </div>
    );
  } else if (coin === 1) {
    return (
      <div>
        <div className="card-text">
          Michele Russo in 2016 brought the first medal in history for
          Basilicata, bringing home a bronze totaling 118 points
        </div>
        <div className="row text-center">
          <div className="col-12 align-items-center">
            <div className="bronze d-inline-block p-2">
              <ion-icon name="medal" size="large" />
              <div className="text-center">1</div>
            </div>
          </div>
        </div>
        <Link
          to={"/contestant/3f37b03da3550a815b84ea34abb2b97b"}
          className="card-link btn btn-outline-success  text-success btn-block"
        >
          More
        </Link>
      </div>
    );
  }
  if (coin === 2) {
    return (
      <div>
        <div className="card-text">
          Massimo Cairo has participated in three different editions of the
          Olympics bringing home the gold medal every time
          <div className="row text-center">
            <div className="col-12 align-items-center">
              <div className="gold d-inline-block p-2">
                <ion-icon name="medal" size="large" />
                <div className="text-center">3</div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={"/contestant/942768149ab1365c96a28e89442d6b51"}
          className="card-link btn btn-outline-success text-success btn-block"
        >
          More
        </Link>
      </div>
    );
  }
  if (coin === 3) {
    return (
      <div>
        <div className="card-text">
          Christopher Mezzomo won the first medal for the Valle d'Aosta in 2018.
          With 103 points he took home a bronze medal.
          <div className="row text-center">
            <div className="col-12 align-items-center">
              <div className="bronze d-inline-block p-2">
                <ion-icon name="medal" size="large" />
                <div className="text-center">1</div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={"/contestant/2e49fc709cc9f2b0c03181195cb1fa27"}
          className="card-link btn btn-outline-success text-success btn-block"
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
        src="/ciprietti.jpg"
        alt="Andrea Ciprietti"
      />
    );
  } else if (coin === 1) {
    return <span />;
  } else if (coin === 2) {
    return (
      <img
        className="card-img-top"
        src="/contestants/942768149ab1365c96a28e89442d6b51.jpg"
        alt="Massimo Cairo"
      />
    );
  } else if (coin === 3) {
    return (
      <img
        className="card-img-top"
        src="/contestants/2e49fc709cc9f2b0c03181195cb1fa27.jpg"
        alt="Christopher Mezzomo"
      />
    );
  } else {
    return <span />;
  }
}

function ContestantCard() {
  const coin = flipCoin(4);
  return (
    <div className="card border-success">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default ContestantCard;

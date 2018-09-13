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
          Lo sapevi che <strong>Andrea Ciprietti</strong> è l'atleta più
          vincente della storia delle olimpiadi italiane. In quattro
          competizioni ha conquistato 3 ori e 1 argenti
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
          className="card-link"
        >
          More
        </Link>
      </div>
    );
  } else if (coin === 1) {
    return (
      <div>
        <div className="card-text">
          Michele Russo nel 2016 ha portato la prima medaglia nella storia per
          la <strong>Basilicata</strong>, portando a casa un bronzo totalizzando
          118 punti
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
          className="card-link"
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
          Lo sapevi che <strong>Massimo Cairo</strong> ha partecipato a tre
          diverse edizioni delle olimpiadi portando a casa tutte le volte la
          medaglia d'oro
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
          className="card-link"
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
        src="/Massimo_Cairo.jpg"
        alt="Massimo Cairo"
      />
    );
  } else {
    return <span />;
  }
}

function ContestantCard() {
  const coin = flipCoin(3);
  return (
    <div className="card">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default ContestantCard;

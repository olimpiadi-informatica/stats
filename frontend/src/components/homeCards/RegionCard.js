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
          Il <strong>Veneto</strong> è la regione che ha portato il maggior
          numeri di atleti alla competizione, 179 per l'esatezza, 8 in più della
          Lombardia
        </p>
        <Link to={"/region/VEN"} className="card-link">
          More
        </Link>
      </div>
    );
  } else if (coin === 1) {
    return (
      <div>
        <div className="card-text">
          Lo sapevi che la <strong>Lombardia</strong> è la regione ad aver vinto
          il maggior numero di medaglie, 89, ed è anche la regione ad aver visto
          il maggior numero di medaglie di oro, 19.
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
        <Link to={"/region/LOM"} className="card-link">
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
    return <img className="card-img-top" src="/veneto.jpg" alt="Veneto" />;
  } else if (coin === 1) {
    return (
      <img className="card-img-top" src="/lombardia.png" alt="Lombardia" />
    );
  } else if (coin === 2) {
    return <span />;
  } else {
    return <span />;
  }
}

function RegionCard() {
  const coin = flipCoin(2);
  return (
    <div className="card">
      {generateImageCard(coin)}
      <div className="card-body">{generateBodyCard(coin)}</div>
    </div>
  );
}

export default RegionCard;

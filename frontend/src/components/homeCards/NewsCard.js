import React from "react";

function NewsCard() {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src="/oii_campobasso.jpg"
        alt="Campobasso OII"
      />
      <div className="card-body">
        <p className="card-text">
          La XVIII edizione delle Olimpiadi Italiane di Informatica si terrà
          presso ITI G. Marconi di <strong>Campobasso</strong> dal 13 al
          15/09/2018.
        </p>
      </div>
    </div>
  );
}

export default NewsCard;

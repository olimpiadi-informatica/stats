import React from "react";

function NewsCard() {
  return (
    <div className="card border-primary">
      <img
        className="card-img-top"
        src="/oii_campobasso.jpg"
        alt="Campobasso OII"
      />
      <div className="card-body">
        <p className="card-text">
          The eighteenth edition of the Italian Olympics of Informatics will be
          held at ITI G. Marconi Campobasso from 13 to 15/09/2018.
        </p>
      </div>
    </div>
  );
}

export default NewsCard;

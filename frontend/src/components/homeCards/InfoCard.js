import React from "react";

function HomeCard() {
  return (
    <div className="card border-primary">
      <img className="card-img-top" src="/logo.png" alt="Card cap" />
      <div className="card-body">
        <div className="card-text">
          Come accordo tra MIUR - Ministero dell'Istruzione, dell'Università e
          della Ricerca ed AICA - Associazione Italiana per l'Informatica ed il
          Calcolo Automatico, viene promossa la partecipazione degli studenti
          della scuola secondaria superiore alle Olimpiadi Italiane di
          Informatica. Lo evento assume particolare significato in quanto
          costituisce occasione per far emergere e valorizzare le "eccellenze"
          esistenti nella scuola italiana, con positiva ricaduta sull'intero
          sistema educativo.
        </div>
        <a
          href="https://www.olimpiadi-informatica.it"
          className="card-link p-2"
        >
          Visita il Sito
        </a>
      </div>
    </div>
  );
}

export default HomeCard;

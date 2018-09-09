import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <div className="row">
        <div className="col-12 title">
          <h2>About Us</h2>
        </div>
        <div className="col-12 mt-2">
          <img className="float-right" src="/logo.png" alt="Card image cap" />
          Come accordo tra MIUR - Ministero dell'Istruzione, dell'Università e
          della Ricerca ed AICA - Associazione Italiana per l'Informatica ed il
          Calcolo Automatico, viene promossa la partecipazione degli studenti
          della scuola secondaria superiore alle Olimpiadi Italiane di
          Informatica. L'evento assume particolare significato in quanto
          costituisce occasione per far emergere e valorizzare le "eccellenze"
          esistenti nella scuola italiana, con positiva ricaduta sull'intero
          sistema educativo. A maggior ragione, se si considera che le
          discipline scientifiche hanno un valore strategico sia per lo sviluppo
          della ricerca scientifica e tecnologica sia per la formazione
          culturale e professionale dei giovani. Inoltre, attraverso iniziative
          come le Olimpiadi di Informatica si creano le precondizioni per
          preparare gli studenti al lavoro ed agli ulteriori livelli di studio e
          ricerca.
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h3>Gallery</h3>
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/giorgio.jpg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/edoardo.jpeg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/edoardo.jpeg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/giorgio.jpg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/edoardo.jpeg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/giorgio.jpg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/edoardo.jpeg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/edoardo.jpeg" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 p-2">
          <img src="/edoardo.jpeg" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default About;

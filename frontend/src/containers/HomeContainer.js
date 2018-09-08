import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { WindRose } from "../graphs";
import { BarChart } from "../graphs";

class HomeContainer extends Component {
  renderContestantCard() {
    const flip_coin = _.random(0, 100);
    if (flip_coin < 50) {
      return (
        <div className="card">
          <img
            className="card-img-top"
            src="/edoardo.jpeg"
            alt="Card image cap"
          />
          <div className="card-body">
            <p className="card-text">
              Lo sapevi che Edoardo è stato l'atleta ad essere più volte riserva
              per le Olimpiadi senza mai ricevere una convocazione
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <img className="card-img-top" src="/giorgio.jpg" alt="Card image cap" />
        <div className="card-body">
          <p className="card-text">
            Lo sapevi che Giorgio è stato l'atleta più vincente di tutti i tempi
            <div className="row text-center">
              <div className="col-12 align-items-center">
                <div className="gold d-inline-block p-2">
                  <ion-icon name="medal" size="large" />
                  <div className="text-center">99</div>
                </div>
                <div className="silver d-inline-block p-2">
                  <ion-icon name="medal" size="large" />
                  <div className="text-center">99</div>
                </div>
                <div className="bronze d-inline-block p-2">
                  <ion-icon name="medal" size="large" />
                  <div className="text-center">99</div>
                </div>
              </div>
            </div>
          </p>
        </div>
      </div>
    );
  }

  renderRegionCard() {
    return (
      <div className="card">
        <img
          className="card-img-top"
          src="/campobasso.jpg"
          alt="Card image cap"
        />
        <div className="card-body">
          <p className="card-text">
            Le olimpiadi quest'anno si svolgono a Campobasso Molise, paese
            probabilmente non esitente
          </p>
        </div>
      </div>
    );
  }

  renderStatsFirstCard() {
    return (
      <div className="card">
        <div className="card-body">
          <WindRose />
        </div>
      </div>
    );
  }

  renderStatsSecondCard() {
    return (
      <div className="card">
        <div className="card-body">
          <BarChart />
        </div>
      </div>
    );
  }

  renderMedalCard() {
    const flip_coin = _.random(0, 100);
    if (flip_coin < 50) {
      return (
        <div className="card">
          <div className="card-body">
            <div className="card-text">
              Lo sapevi che Pordenone è la regione straniere ad aver vinto il
              numero maggiore di medaglie
            </div>
            <div className="row text-center">
              <div className="col-12 align-items-center">
                <div className="gold d-inline-block p-2">
                  <ion-icon name="medal" size="large" />
                  <div className="text-center">5</div>
                </div>
                <div className="silver d-inline-block p-2">
                  <ion-icon name="medal" size="large" />
                  <div className="text-center">5</div>
                </div>
                <div className="bronze d-inline-block p-2">
                  <ion-icon name="medal" size="large" />
                  <div className="text-center">6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-text">
            Lo sapevi che Colleferro è l'impero ad aver vinto il numero minore
            di medaglie
          </div>
          <div className="row text-center">
            <div className="col-12 align-items-center">
              <div className="bronze d-inline-block p-2">
                <ion-icon name="medal" size="large" />
                <div className="text-center">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInfoCard() {
    return (
      <div className="card">
        <img className="card-img-top" src="/logo.png" alt="Card image cap" />
        <div className="card-body">
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
    );
  }

  render() {
    return (
      <div className="HomeContainer">
        <div className="row p-2">
          <div className="col-12">
            <div className="card-columns">
              {this.renderInfoCard()}
              {this.renderContestantCard()}
              {this.renderRegionCard()}
              {this.renderStatsFirstCard()}
              {this.renderStatsSecondCard()}
              {this.renderMedalCard()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;

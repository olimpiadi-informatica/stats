import React, { Component } from "react";
// import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchRegions } from "../actions/regions";

import { WindRose } from "../graphs";
import { BarChart } from "../graphs";

class HomeContainer extends Component {
  renderContestantCard() {
    // const flip_coin = _.random(0, 100);
    return (
      <div className="card">
        <img className="card-img-top" src="/ciprietti.jpg" alt="Card cap" />
        <div className="card-body">
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
        </div>
      </div>
    );
  }

  renderRegionCard() {
    return (
      <div className="card">
        <img className="card-img-top" src="/veneto.jpg" alt="Card cap" />
        <div className="card-body">
          <p className="card-text">
            Il <strong>Veneto</strong> è la regione che ha portato il maggior
            numeri di atleti alla competizione, 179 per l'esatezza, 8 in più
            della Lombardia
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
              Lo sapevi che la <strong>Lombardia</strong> è la regione ad aver
              vinto il maggior numero di medaglie, 89, ed è anche la regione ad
              aver visto il maggior numero di medaglie di oro, 19.
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
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-text">
            Michele Russo nel 2016 ha portato la prima medaglia nella storia per
            la <strong>Basilicata</strong>, portando a casa un bronzo
            totalizzando 118 punti
          </div>
          <div className="row text-center">
            <div className="col-12 align-items-center">
              <div className="bronze d-inline-block p-2">
                <ion-icon name="medal" size="large" />
                <div className="text-center">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTasksCard() {
    return (
      <div className="card">
        <img className="card-img-top" src="/mirror.jpg" alt="Card cap" />
        <div className="card-body">
          <p className="card-text">
            <strong>Stanza degli specchi</strong> è uno dei task più difficile
            che è mai apparso ad una olimpiade. Nessun atleta è riuscito ad
            ottenere il punteggio massimo di 100 punti. Solo quattro atleti sono
            riusciti ad ottenere 80 punti.
          </p>
        </div>
      </div>
    );
  }
  renderNewsCard() {
    return (
      <div className="card">
        <img
          className="card-img-top"
          src="/oii_campobasso.jpg"
          alt="Card cap"
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

  renderInfoCard() {
    return (
      <div className="card">
        <img className="card-img-top" src="/logo.png" alt="Card cap" />
        <div className="card-body">
          Come accordo tra MIUR - Ministero dell'Istruzione, dell'Università e
          della Ricerca ed AICA - Associazione Italiana per l'Informatica ed il
          Calcolo Automatico, viene promossa la partecipazione degli studenti
          della scuola secondaria superiore alle Olimpiadi Italiane di
          Informatica. Lo evento assume particolare significato in quanto
          costituisce occasione per far emergere e valorizzare le "eccellenze"
          esistenti nella scuola italiana, con positiva ricaduta sull'intero
          sistema educativo. A maggior ragione, se si considera che le
          discipline scientifiche hanno un valore strategico sia per lo sviluppo
          della ricerca scientifica e tecnologica sia per la formazione
          culturale e professionale dei giovani. Inoltre, attraverso iniziative
          come le Olimpiadi di Informatica si creano le precondizioni per
          preparare gli studenti al lavoro ed agli ulteriori livelli di studio e
          ricerca.
          <a href="https://www.olimpiadi-informatica.it">Visita il sito</a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="HomeContainer p-2">
        <div className="row">
          <div className="col-12">
            <div className="card-columns">
              {this.renderInfoCard()}
              {this.renderContestantCard()}
              {this.renderRegionCard()}
              {this.renderNewsCard()}
              {this.renderStatsFirstCard()}
              {this.renderStatsSecondCard()}
              {this.renderMedalCard()}
              {this.renderTasksCard()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.regions && state.regions.error)
    return { error: "Connection Error" };
  return { regions: state.regions };
}

export default connect(
  mapStateToProps,
  { fetchRegions }
)(HomeContainer);

import React, { Component } from "react";

export default class Contribute extends Component {
  render() {
    return (
      <div className="row p-2">
        <h2 className="col-12 text-center text-danger">Contribute</h2>
        <div className="col-12">
          <p>
            You can contribute to OII Stats by sending us bug reports or missing data. Unfortunately not all the data of
            the previous editions have been found and your contribution would be a great help. Also if you want to see
            your picture appear among the participants, send it along with an authorization to process the data.
            <br />
            Please send an email to <code>edoardo.morassutto@gmail.com</code>
            <br />
            Thank you
          </p>
        </div>
      </div>
    );
  }
}

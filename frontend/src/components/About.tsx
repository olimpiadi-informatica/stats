import React, { Component } from "react";

export default class AboutComponent extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 title">
            <h2 className="text-center text-danger">About Us</h2>
          </div>
          <div className="col-12 mt-2">
            <img
              className="float-right p-3 img-fluid"
              width="200"
              src="/oiistats.png"
              alt="Logo"
            />
            OII stats is a platform that was created to provide essential but
            reliable statistics on the progress of the national competitions of
            the Italian IT Olympics. The data are collected during the entire
            duration of the various tenders and contain all the information
            available to the staff of the Olympics tutors.
          </div>
        </div>
        <div className="row m-2">
          <div className="col-12 text-center">
            <h3 className="text-danger">Gallery</h3>
          </div>
          <div className="col-12 col-md-4 p-2">
            <img
              src="/gallery/gallery4.jpg"
              className="img-fluid"
              alt="Card cap"
            />
          </div>
          <div className="col-12 col-md-4 p-2">
            <img
              src="/gallery/gallery2.png"
              className="img-fluid"
              alt="Card cap"
            />
          </div>
          <div className="col-12 col-md-4 p-2">
            <img
              src="/gallery/gallery3.png"
              className="img-fluid"
              alt="Card cap"
            />
          </div>
          <div className="col-12 col-md-4 p-2">
            <img
              src="/gallery/gallery1.png"
              className="img-fluid"
              alt="Card cap"
            />
          </div>
        </div>
      </div>
    );
  }
}

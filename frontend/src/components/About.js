import React from "react";
// import { Link } from "react-router-dom";

function renderGallery() {
  return (
    <div className="row m-2">
      <div className="col-12 text-center">
        <h3 className="text-danger">Gallery</h3>
      </div>
      <div className="col-12 col-md-4 p-2">
        <img src="/gallery/gallery4.jpg" className="img-fluid" alt="Card cap" />
      </div>
      <div className="col-12 col-md-4 p-2">
        <img src="/gallery/gallery2.png" className="img-fluid" alt="Card cap" />
      </div>
      <div className="col-12 col-md-4 p-2">
        <img src="/gallery/gallery3.png" className="img-fluid" alt="Card cap" />
      </div>
      <div className="col-12 col-md-4 p-2">
        <img src="/gallery/gallery1.png" className="img-fluid" alt="Card cap" />
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <div className="row">
        <div className="col-12 title">
          <h2 className="text-center text-danger">About Us</h2>
        </div>
        <div className="col-12 mt-2">
          <img className="float-right p-3" src="/logo.png" alt="Card cap" />
          As an agreement between MIUR - Ministry of Education, University and
          Research and AICA - Italian Association for Informatics and Automatic
          Calculation, the participation of upper secondary school students is
          promoted to the Italian Games Olympics. The event takes on particular
          significance as it is an opportunity to bring out and enhance the
          excellences existing in the Italian school, with positive effects on
          the entire educational system. A fortiori, if we consider that the
          scientific disciplines have a strategic value both for the development
          of scientific and technological research and for the cultural and
          professional training of young people. Furthermore, through
          initiatives such as the Information Olympics, preconditions are
          created to prepare students for work and for further levels of study
          and research.
        </div>
      </div>
      {renderGallery()}
    </div>
  );
}

export default About;

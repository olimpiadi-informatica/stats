import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

class ContributeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contribute: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="row p-2">
        <h2 className="col-12">Contribute</h2>
        <div className="col-12">
          <p>
            Devi contribuire perchè ci mancano i dannati dati. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Etiam lacinia dignissim diam
            sit amet fringilla. Phasellus cursus rhoncus suscipit. Ut varius
            tincidunt facilisis. Fusce ac congue purus, ut interdum orci. Cras
            feugiat porttitor elit, vel venenatis odio malesuada sit amet.
            Curabitur dolor neque, porttitor vitae finibus sed, porttitor nec
            turpis. Quisque non vulputate leo, ut dignissim sem. Nullam porta,
            leo non viverra rhoncus, magna massa dapibus neque, nec rhoncus ex
            libero ut tortor. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        </div>
        <div className="col-12">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
                required
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                required
              />
            </div>

            <div className="input-group mb-3">
              <textarea
                name="contribute"
                value={this.state.contribute}
                onChange={this.handleInputChange}
                className="form-control"
                required
                placeholder="Your Contribute"
              />
            </div>

            <br />
            <input type="submit" value="Send" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

export default ContributeContainer;

import React, { Component } from "react";
// import _ from "lodash";
// import { Link } from "react-router-dom";

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
        <h2 className="col-12 text-center">Contribute</h2>
        <div className="col-12">
          <p>
            You can contribute to OII Stats by sending us bug reports or missing
            data. Unfortunately not all the data of the previous editions have
            been found and your contribution would be a great help. Also if you
            want to see your picture appear among the participants, send it
            along with an authorization to process the data.
            <br />
            <br />
            Thank you
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
            <input
              type="submit"
              value="Send"
              className="btn btn-primary disabled"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ContributeContainer;

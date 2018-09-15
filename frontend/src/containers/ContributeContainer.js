import React, { Component } from "react";

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
        <h2 className="col-12 text-center text-danger">Contribute</h2>
        <div className="col-12">
          <p>
            You can contribute to OII Stats by sending us bug reports or missing
            data. Unfortunately not all the data of the previous editions have
            been found and your contribution would be a great help. Also if you
            want to see your picture appear among the participants, send it
            along with an authorization to process the data.
            <br />
            Please send an email to edoardo.morassutto@gmail.com
            <br />
            Thank you
          </p>
        </div>
      </div>
    );
  }
}

export default ContributeContainer;

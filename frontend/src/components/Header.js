import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const q = this.state.value
    window.location =  `/search/${q}`
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contests">Contests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contestants">Contestants</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/regions">Regions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contribute">Contribute</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
            <input className="form-control mr-sm-2" value={this.state.value} onChange={this.handleChange} type="search" placeholder="Search" aria-label="Search" required/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>

    )
  }

}



export default Header

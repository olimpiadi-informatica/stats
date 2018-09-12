import React, { Component } from "react";
// import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { value: "", isOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const q = this.state.value;
    window.location = `/search/${q}`;
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="p-2">
        <Navbar color="light" light expand="lg">
          <NavbarBrand href="/">
            <img src="/logo.png" height="40" alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link
                  to="/contests"
                  className="navbar-light navbar-nav nav-link"
                >
                  Contests
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/contestants"
                  className="navbar-light navbar-nav nav-link"
                >
                  Hall of Fame
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/regions"
                  className="navbar-light navbar-nav nav-link"
                >
                  Regions
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/tasks" className="navbar-light navbar-nav nav-link">
                  Tasks
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/contribute"
                  className="navbar-light navbar-nav nav-link"
                >
                  Contribute
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="navbar-light navbar-nav nav-link">
                  About
                </Link>
              </NavItem>
              <NavItem>
                <form
                  className="form-inline my-2 my-lg-0 float-right"
                  onSubmit={this.handleSubmit}
                >
                  <input
                    className="form-control mr-sm-2"
                    value={this.state.value}
                    onChange={this.handleChange}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    required
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

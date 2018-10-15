import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

type Props = {} & RouteComponentProps<any>;
type State = {
  value: string;
  isOpen: boolean;
};

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { value: "", isOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.history.push(`/search?q=${encodeURIComponent(this.state.value)}`);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="row" style={{ marginTop: "15px" }}>
        <div className="col-9">
          <Link to="/" className="logo-header">
            <img src="/static/oiistats.png" height="50" alt="logo" />
          </Link>
        </div>
        <div className="navbar-light col-3 d-lg-none">
          <NavbarToggler className="float-right" onClick={this.toggle} />
        </div>
        <Navbar color="white" light expand="lg">
          <Collapse isOpen={this.state.isOpen} navbar className="">
            <Nav className="" navbar>
              <NavItem>
                <Link to="/" className="navbar-nav nav-link ">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/contests" className="navbar-nav nav-link ">
                  Contests
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/contestants" className=" navbar-nav nav-link ">
                  Hall of Fame
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/regions" className="navbar-nav nav-link ">
                  Regions
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/tasks" className="navbar-nav nav-link ">
                  Tasks
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/contribute" className="navbar-nav nav-link ">
                  Contribute
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="navbar-nav nav-link ">
                  About
                </Link>
              </NavItem>
              <NavItem className="ml-lg-4">
                <form className="form-inline my-lg-0 float-right" onSubmit={this.handleSubmit}>
                  <input
                    className="form-control mr-sm-2"
                    value={this.state.value}
                    onChange={this.handleChange}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    required
                  />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
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

export default withRouter(Header);

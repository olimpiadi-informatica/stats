import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchContest, fetchResults } from "../actions/contests";
import { ContestItem } from "../components";

class ContestContainer extends Component {
  componentDidMount() {
    const year = this.props.match.params.year;
    this.props.fetchContest(year);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.contest && !props.contest.results)
      props.fetchResults(props.match.params.year);
    return null;
  }

  render() {
    const { contest } = this.props;
    const { error } = this.props;
    if (error) return <div>{error}</div>;

    if (!contest || !contest.navigation)
      return <div className="Loading">Loading ...</div>;
    return (
      <div>
        <div className="row p-2">
          <div className="col-12 ">
            <h2 className="title text-center">
              {contest.location.location} {contest.navigation.current}
            </h2>
          </div>
        </div>
        <ContestItem contest={contest} results={contest.results} />
      </div>
    );
  }
}

function mapStateToProps({ contests }, ownProps) {
  if (contests && contests.error) return { error: "Connection Error" };
  const year = ownProps.match.params.year;
  return { contest: contests[year] };
}

export default connect(
  mapStateToProps,
  { fetchContest, fetchResults }
)(ContestContainer);

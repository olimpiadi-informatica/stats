import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchContests } from "../actions/contests";

import { ContestListItem } from "../components";

class ContestsContainer extends Component {
  componentDidMount() {
    this.props.fetchContests();
  }

  renderContest(contests) {
    if (!contests) return <div className="Loading">Loading ...</div>;
    const ordered_contests = _.sortBy(_.values(contests), function(o) {
      return -o.year;
    });
    return _.map(ordered_contests, (contest, i) => {
      return <ContestListItem key={contest.year + "-" + i} contest={contest} />;
    });
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { contests } = this.props;
    if (!contests) return <div className="Loading">Loading ...</div>;

    return (
      <div className="row p-2">
        <h2 className="col-12 title text-center text-danger">Contests</h2>
        <div className="col-12">
          <ul className="list-group list-group-flush">
            {this.renderContest(contests)}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.contests && state.contests.error)
    return { error: "Connection Error" };
  return { contests: state.contests };
}

export default connect(
  mapStateToProps,
  { fetchContests }
)(ContestsContainer);

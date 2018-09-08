import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchContestats } from "../actions/contestants";
import { ContestantListItem } from "../components";

class ContestantsContainer extends Component {
  componentDidMount() {
    this.props.fetchContestats();
  }

  renderContestants(contestants) {
    if (!contestants) {
      return <div>Loading...</div>;
    }

    const contestant_list = _.map(contestants, contestant => {
      return (
        <ContestantListItem
          key={contestant.contestant.id}
          contestant={contestant}
        />
      );
    });
    return (
      <div>
        <ul className="list-group">{contestant_list}</ul>
      </div>
    );
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { contestants } = this.props;
    if (!contestants) return <div className="Loading">Loading ...</div>;
    return (
      <div className="row">
        <div className="col-12">
          <h2>Contestants</h2>
          {this.renderContestants(contestants)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.contestants && state.contestants.error)
    return { error: "Connection Error" };
  return { contestants: state.contestants };
}

export default connect(
  mapStateToProps,
  { fetchContestats }
)(ContestantsContainer);

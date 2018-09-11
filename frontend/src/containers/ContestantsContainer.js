import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchContestats } from "../actions/contestants";
import { ContestantListItem } from "../components";

class ContestantsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { cutoff: 50 };
  }

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

  moreContestants() {
    this.setState({ cutoff: this.state.cutoff + 50 });
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { contestants } = this.props;
    if (!contestants) return <div className="Loading">Loading ...</div>;
    let contestants_list = contestants.slice(0, this.state.cutoff);
    const show_more_contestants =
      this.state.cutoff < contestants.length ? (
        <button
          onClick={this.moreContestants.bind(this)}
          className="btn btn-primary mt-2"
        >
          More
        </button>
      ) : (
        <div />
      );
    return (
      <div className="row">
        <div className="col-12">
          <h2>Hall of Fame</h2>
          {this.renderContestants(contestants_list)}
          {show_more_contestants}
        </div>
      </div>
    );
  }
}

function sortContestants(contestants) {
  if (!contestants) return [];
  const array_contestant = _.values(contestants);
  return _(array_contestant)
    .chain()
    .flatten()
    .sortBy(function(contestant) {
      return [
        contestant.num_medals.gold,
        contestant.num_medals.silver,
        contestant.num_medals.bronze
      ];
    })
    .value()
    .reverse();
}

function mapStateToProps(state) {
  if (state.contestants && state.contestants.error)
    return { error: "Connection Error" };
  return { contestants: sortContestants(state.contestants) };
}

export default connect(
  mapStateToProps,
  { fetchContestats }
)(ContestantsContainer);

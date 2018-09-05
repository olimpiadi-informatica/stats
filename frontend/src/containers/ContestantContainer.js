import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchContestat } from "../actions/contestants";

class ContestantContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchContestat(id);
  }

  renderParticipations(participations) {
    if (!participations) return <div className="Loading">Loading ...</div>;

    return _.map(participations, (partecipation, i) => {
      return <span key={"participations" + i}>{partecipation.year} </span>;
    });
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;

    const contestant_main = this.props.contestant;
    if (!contestant_main) return <div className="Loading">Loading ...</div>;

    const { contestant } = this.props.contestant;
    const { participations } = this.props.contestant;

    return (
      <div className="row">
        <div className="col-12">
          <div>
            {contestant.first_name} {contestant.last_name}
          </div>
          <div>
            {" "}
            participations : {this.renderParticipations(participations)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ contestants }, ownProps) {
  if (contestants && contestants.error) return { error: "Connection Error" };
  const id = ownProps.match.params.id;
  return { contestant: contestants[id] };
}

export default connect(
  mapStateToProps,
  { fetchContestat }
)(ContestantContainer);

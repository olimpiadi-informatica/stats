import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchSearchResults } from "../actions/search";
// import { Link } from "react-router-dom";

import { RegionListItem } from "../components";
import { ContestantListItem } from "../components";
import { ContestListItem } from "../components";

class SearchContainer extends Component {
  componentDidMount() {
    const q = this.props.match.params.q;
    this.props.fetchSearchResults(q);
  }

  renderResult(result, type) {
    if (type === "region") return <RegionListItem region={result} />;
    else if (type === "-contestants")
      return <ContestantListItem contestant={result} />;
    else if (type === "-contest") return <ContestListItem contest={result} />;
  }

  renderSearch(results) {
    const results_list = _.map(results, (value, key) => {
      const chiave = Object.keys(value);
      return (
        <div key={key}>
          <span>{this.renderResult(value[chiave], chiave[0])}</span>
        </div>
      );
    });
    return <ul className="list-group">{results_list}</ul>;
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { search } = this.props;
    if (!search) return <div className="Loading">Loading ...</div>;
    const q = this.props.match.params.q;
    const number_results = search.length;
    const no_results = number_results === 0 ? <div>No results</div> : <div />;

    return (
      <div className="row p-2">
        <h2 className="col-12">
          {number_results} Results for <span className="text-success">{q}</span>
        </h2>
        <div className="col-12">{no_results}</div>
        <div className="col-12">{this.renderSearch(search)}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.search && state.search.error) return { error: "Connection Error" };
  return { search: state.search };
}

export default connect(
  mapStateToProps,
  { fetchSearchResults }
)(SearchContainer);

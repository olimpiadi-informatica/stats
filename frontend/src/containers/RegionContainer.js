import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchRegion, fetchRegionResults } from "../actions/regions";

class RegionContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchRegion(id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.region && !props.region.results)
      props.fetchRegionResults(props.match.params.id);
    return null;
  }

  renderMedalsPerYear(medals_per_year) {
    if (!medals_per_year) return <div className="Loading">Loading ...</div>;
    return _.map(medals_per_year, (medals, i) => {
      return (
        <div key={`medal${i}`}>
          <h5>{medals.year}</h5>
          <div>Gold : {medals.num_medals.gold}</div>
          <div>Silver : {medals.num_medals.silver}</div>
          <div>Bronze : {medals.num_medals.bronze}</div>
        </div>
      );
    });
  }

  renderTaskScores(task_scores, id) {
    if (!task_scores) return <div className="Loading">Loading ...</div>;
    return _.map(task_scores, (task, i) => {
      const score = task.score ? <span> Score : {task.score} </span> : "";
      return (
        <div key={`${task.name}${id}${i}`}>
          {task.name} {score}
        </div>
      );
    });
  }
  renderContenstantResultsPerYear(contestants) {
    if (!contestants) return <div className="Loading">Loading ...</div>;
    return _.map(contestants, contestant => {
      const medal = contestant.medal ? (
        <div>medal : {contestant.medal}</div>
      ) : (
        ""
      );
      const rank = contestant.rank ? <div>rank : {contestant.rank}</div> : "";
      return (
        <div key={contestant.contestant.id}>
          <div>
            {contestant.contestant.first_name} {contestant.contestant.last_name}
          </div>
          <div>{medal}</div>
          <div>{rank}</div>
          <h6>Task</h6>
          {this.renderTaskScores(
            contestant.task_scores,
            contestant.contestant.id
          )}
        </div>
      );
    });
  }

  renderResultsPerYear(results_per_year) {
    if (!results_per_year) return <div className="Loading">Loading ...</div>;
    return _.map(results_per_year, (results, i) => {
      return (
        <div key={`results${i}`}>
          <h5>{results.year}</h5>
          {this.renderContenstantResultsPerYear(results.contestants)}
        </div>
      );
    });
  }

  renderContenstantPerYear(contestants_per_year) {
    if (!contestants_per_year)
      return <div className="Loading">Loading ...</div>;
    return _.map(contestants_per_year, contestants => {
      const year = contestants.year;
      const num_contestants = contestants.num_contestants;
      return (
        <div key={`contestant${year}`}>
          <h5>{year}</h5>
          <h5>{num_contestants} Participants</h5>
        </div>
      );
    });
  }

  renderRegion(region) {
    if (!region) return <div className="Loading">Loading ...</div>;
    console.log(region);
    const avg_contestants_per_year = region.avg_contestants_per_year ? (
      <div>avg_contestants_per_year {region.avg_contestants_per_year}</div>
    ) : (
      ""
    );
    const results_per_year = region.results ? (
      <div>{this.renderResultsPerYear(region.results.results)}</div>
    ) : (
      ""
    );
    return (
      <div>
        <h3>Medals</h3>
        {this.renderMedalsPerYear(region.medals_per_year)}
        {results_per_year}
        {this.renderContenstantPerYear(region.contestants_per_year)}
      </div>
    );
  }

  renderResults(results) {
    if (!results) return <div>Nessun Risultato</div>;
    return <div>Results</div>;
  }

  changeActiveTab(name) {
    console.log(name);
  }

  render() {
    const { region } = this.props;
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    if (!region || !region.navigation)
      return <div className="Loading">Loading ...</div>;
    return (
      <div className="row">
        <div className="col-12">
          <h3>{region.name}</h3>
          <nav className="nav nav-pills nav-justified">
            <a
              className="nav-item nav-link active"
              onClick={() => {
                this.changeActiveTab("medals");
              }}
            >
              Medals
            </a>
            <a
              className="nav-item nav-link"
              onClick={() => {
                this.changeActiveTab("medals");
              }}
            >
              Results
            </a>
            <a
              className="nav-item nav-link "
              onClick={() => {
                this.changeActiveTab("Contestants");
              }}
            >
              Contestants
            </a>
          </nav>
          {this.renderRegion(region)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ regions }, ownProps) {
  const id = ownProps.match.params.id;
  if (regions && regions.error) return { error: "Connection Error" };
  return { region: regions[id], activeTab: "medals" };
}
export default connect(
  mapStateToProps,
  { fetchRegion, fetchRegionResults }
)(RegionContainer);

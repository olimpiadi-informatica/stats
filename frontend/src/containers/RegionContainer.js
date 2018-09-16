import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import _ from "lodash";
import { fetchRegion, fetchRegionResults } from "../actions/regions";
import { ScoreBadge } from "../components";

class RegionContainer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

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

  renderRegion(region) {
    if (!region) return <div className="Loading">Loading ...</div>;
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

  renderContestatsPerYear(contestants, year) {
    return _.map(contestants, contestant => {
      const medal = contestant.medal ? (
        <div className={`${contestant.medal} `}>
          <ion-icon name="medal" size="small" />
        </div>
      ) : (
        <div />
      );
      const rank = contestant.rank ? contestant.rank : "N/a";
      const scores = contestant.task_scores;
      let problems = [];
      let final_score = null;
      for (const score of scores || []) {
        if (!score) continue;
        if (score.score !== null && final_score === null) final_score = 0;
        if (score.score !== null) final_score += score.score;
        problems.push(
          <td key={`/task/${year}/${score.name}`}>
            <Link to={`/task/${year}/${score.name}`} className="">
              <ScoreBadge
                score={score.score}
                max_score={score.max_score_possible}
              />{" "}
              {score.name}
            </Link>
          </td>
        );
      }

      return (
        <tr key={year + contestant.contestant.id}>
          <th scope="row">
            <Link className="" to={`/contest/${year}`}>
              {year}
            </Link>
          </th>
          <td>
            <Link className="" to={`/contestant/${contestant.contestant.id}`}>
              {contestant.contestant.first_name}{" "}
              {contestant.contestant.last_name}
            </Link>
          </td>
          <td className="text-center">{medal}</td>
          <td>{rank}</td>
          <td>{Math.round(final_score)}</td>
          {problems}
        </tr>
      );
    });
  }

  renderResults(results) {
    const ordered_results_list = _.sortBy(_.values(results), function(o) {
      return -o.year;
    });
    const results_list = _.map(ordered_results_list, result => {
      const year = result.year;
      return this.renderContestatsPerYear(result.contestants, year);
    });
    return (
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-responsive-xs">
            <thead className="bg-success text-white">
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Contestant</th>
                <th scope="col" className="text-center">
                  Medal
                </th>
                <th scope="col">Ranks</th>
                <th scope="col">Score</th>
                <th colSpan="4" className="text-center" scope="col">
                  Tasks
                </th>
              </tr>
            </thead>
            <tbody>{results_list}</tbody>
          </table>
        </div>
      </div>
    );
  }

  renderInfoPerYear(years) {
    if (!years) return <div className="Loading">Loading ...</div>;

    const ordered_years_list = _.sortBy(_.values(years), function(o) {
      return -o.year;
    });
    const years_list = _.map(ordered_years_list, item => {
      const year = item.year;
      const num_contestants = item.num_contestants;
      const medals = item.num_medals ? (
        <div className="col-12 col-md-5 align-items-center text-center">
          <div className="gold d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{item.num_medals.gold}</div>
          </div>
          <div className="silver d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{item.num_medals.silver}</div>
          </div>
          <div className="bronze d-inline-block p-2">
            <ion-icon name="medal" size="large" />
            <div className="text-center">{item.num_medals.bronze}</div>
          </div>
        </div>
      ) : (
        <div />
      );
      const location = item.location.location;
      return (
        <li key={year} className="list-group-item">
          <div className=" row">
            <div className="col-12">
              <Link className="text-success" to={`/contest/${year}`}>
                <h6>
                  {location} - {year}
                </h6>
              </Link>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 col-md-7">
              <div className="media">
                <img
                  className="mr-3 align-self-start img-fluid"
                  src={`/contests/${year}.jpg`}
                  alt="Contestant"
                  onError={this.imageError.bind(this)}
                  width="125"
                />
                <div className="media-body">
                  <dl className="row">
                    <dt className="col-sm-7">Number Of Contestants</dt>
                    <dd className="col-sm-5">{num_contestants}</dd>
                  </dl>
                </div>
              </div>
            </div>
            {medals}
          </div>
        </li>
      );
    });
    return (
      <div className=" row">
        <div className="col-12">
          <ul className="list-group list-group-flush">{years_list}</ul>
        </div>
      </div>
    );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  hasHosted(hosted) {
    if (!hosted || hosted.length === 0) return <div />;
    const hostedin = _.map(hosted, (host, i) => {
      return <span key={i}>{host} </span>;
    });
    return <h5 className="text-center"> Host in {hostedin}</h5>;
  }

  imageError(event) {
    event.target.src = "/placeholder.jpg";
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { region } = this.props;
    if (!region || !region.navigation || !region.results)
      return <div className="Loading">Loading ...</div>;
    return (
      <div>
        <div className="row p-2">
          <div className="col-12 text-center">
            <h2 className="text-danger">{region.name}</h2>
            {this.hasHosted(region.hosted)}
            <img
              className="mr-3 align-self-start img-fluid"
              src={`/regions/${region.name}.png`}
              alt="Region"
              onError={this.imageError.bind(this)}
              width="125"
            />
          </div>
        </div>
        <Nav tabs className="mt-4">
          <NavItem className="ml-auto">
            <NavLink
              className={this.state.activeTab === "1" ? "active" : ""}
              onClick={() => {
                this.toggle("1");
              }}
            >
              {" "}
              Participations
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink
              className={this.state.activeTab === "2" ? "active" : ""}
              onClick={() => {
                this.toggle("2");
              }}
            >
              {" "}
              Results
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="p-2">
          <TabPane tabId="1">{this.renderInfoPerYear(region.years)}</TabPane>
          <TabPane tabId="2">
            {this.renderResults(region.results.results)}
          </TabPane>
        </TabContent>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import _ from "lodash";
import { fetchRegion, fetchRegionResults } from "../actions/regions";

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
    // const avg_contestants_per_year = region.avg_contestants_per_year ? (
    //   <div>avg_contestants_per_year {region.avg_contestants_per_year}</div>
    // ) : (
    //   ""
    // );
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
      const problem_1 =
        scores && scores[0] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {" "}
              {scores[0].score}
            </span>{" "}
            {scores[0].name}
          </td>
        ) : (
          <td />
        );
      const problem_2 =
        scores && scores[1] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {scores[2].score}
            </span>{" "}
            {scores[1].name}{" "}
          </td>
        ) : (
          <td />
        );
      const problem_3 =
        scores && scores[2] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {scores[2].score}
            </span>{" "}
            {scores[2].name}{" "}
          </td>
        ) : (
          <td />
        );
      const problem_4 =
        scores && scores[3] ? (
          <td>
            <span className="badge badge-pill badge-primary">
              {scores[3].score}
            </span>{" "}
            {scores[3].name}{" "}
          </td>
        ) : (
          <td />
        );

      let final_score = 0;
      _.each(scores, score => {
        if (score.score) final_score += score.score;
      });
      return (
        <tr key={year + contestant.contestant.id}>
          <th scope="row">
            <Link to={`/contest/${year}`}>{year}</Link>
          </th>
          <td>
            <Link to={`/contestant/${contestant.contestant.id}`}>
              {contestant.contestant.first_name}{" "}
              {contestant.contestant.last_name}
            </Link>
          </td>
          <td className="text-center">{medal}</td>
          <td>{rank}</td>
          <td>{final_score}</td>
          {problem_1}
          {problem_2}
          {problem_3}
          {problem_4}
        </tr>
      );
    });
  }

  renderResults(results) {
    const results_list = _.map(results, result => {
      const year = result.year;

      return this.renderContestatsPerYear(result.contestants, year);
    });

    return (
      <div className="row">
        <table className="table table-striped table-responsive-xs">
          <thead>
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
    );
  }

  renderInfoPerYear(years) {
    if (!years) return <div className="Loading">Loading ...</div>;
    const years_list = _.map(years, item => {
      const year = item.year;
      const num_contestants = item.num_contestants;
      const medals = item.num_medals ? (
        <div className="col-12 col-md-5 align-items-center">
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
          <div className=" row align-items-center">
            <div className="col-12">
              <Link to={`/contest/${year}`}>{year}</Link>
            </div>
            <div className="col-12 col-md-7">
              <dl className="row">
                <dt className="col-sm-5">Location</dt>
                <dd className="col-sm-7">{location}</dd>
                <dt className="col-sm-5">Number Of Contestants</dt>
                <dd className="col-sm-7">{num_contestants}</dd>
              </dl>
            </div>
            {medals}
          </div>
        </li>
      );
    });
    return <ul className="list-group">{years_list}</ul>;
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
    return <h4>Hosted in {hostedin}</h4>;
  }

  render() {
    const { error } = this.props;
    if (error) return <div>{error}</div>;
    const { region } = this.props;
    if (!region || !region.navigation || !region.results)
      return <div className="Loading">Loading ...</div>;
    return (
      <div className="row">
        <div className="col-12">
          <h3>{region.name}</h3>
          {this.hasHosted(region.hosted)}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "1" ? "active" : ""}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                <div>Info</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "2" ? "active" : ""}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Results
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">{this.renderInfoPerYear(region.years)}</TabPane>
            <TabPane tabId="2">
              {this.renderResults(region.results.results)}
            </TabPane>
          </TabContent>
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

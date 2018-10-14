import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import _ from "lodash";

import {
  RegionDetail,
  RegionResults,
  RegionResultsYear,
  loadRegionDetail,
  loadRegionResults
} from "../remote/region";
import Loading from "./Loading";
import Medals from "./Medals";
import MedalIcon from "./MedalIcon";
import ContestantLink from "./ContestantLink";
import ScoreBadge from "./ScoreBadge";
import { round } from "../utils/math";

type Props = RouteComponentProps<any>;
type State = {
  region: RegionDetail | null;
  results: RegionResults | null;
  activeTab: "detail" | "results";
};

export default class RegionContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { region: null, results: null, activeTab: "detail" };
  }

  async componentDidMount() {
    this.setState({ ...this.state, region: null, results: null });
    this.setState({
      ...this.state,
      region: await loadRegionDetail(this.props.match.params.id),
      results: await loadRegionResults(this.props.match.params.id)
    });
  }

  changeTab(newTab: "detail" | "results") {
    if (this.state.activeTab !== newTab)
      this.setState({ ...this.state, activeTab: newTab });
  }

  renderHosted(years: number[]) {
    if (!years.length) return <span />;
    const hostedin =
      years.length === 1
        ? years[0]
        : years.slice(0, -1).join(", ") + " and " + years[years.length - 1];
    return <h5 className="text-center"> Host in {hostedin}</h5>;
  }

  renderDetail(region: RegionDetail) {
    const years = _.orderBy(region.years, ["year"], ["desc"]).map(year => {
      const medals = {
        gold: { number: year.num_medals.gold, cutoff: null },
        silver: { number: year.num_medals.silver, cutoff: null },
        bronze: { number: year.num_medals.bronze, cutoff: null }
      };
      return (
        <li key={year.year} className="list-group-item">
          <div className="row">
            <div className="col-12">
              <Link className="text-success" to={`/contest/${year.year}`}>
                <h6>
                  {year.location.location} - {year.year}
                </h6>
              </Link>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 col-md-7">
              <div className="media">
                <Link to={`/contest/${year.year}`}>
                  <img
                    className="mr-3 align-self-start img-fluid"
                    src={`/static/contests/${year.year}.jpg`}
                    alt="Contestant"
                    onError={(event: any) => {
                      event.target.src = "/static/placeholder.jpg";
                    }}
                    width="125"
                  />
                </Link>
                <div className="media-body">
                  <dl className="row">
                    <dt className="col-sm-7">Number Of Contestants</dt>
                    <dd className="col-sm-5">{year.num_contestants}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 align-items-center text-center">
              <Medals medals={medals} cutoffs={false} />
            </div>
          </div>
        </li>
      );
    });
    return (
      <div className=" row">
        <div className="col-12">
          <ul className="list-group list-group-flush">{years}</ul>
        </div>
      </div>
    );
  }

  renderResultsOfYear(results: RegionResultsYear, num_problems: number) {
    const { year, contestants } = results;
    return contestants.map(contestant => {
      let final_score = null;
      let problems = [];
      for (const score of contestant.task_scores || []) {
        if (!score) continue;
        if (score.score !== null) {
          if (final_score === null) final_score = 0;
          final_score += score.score;
        }
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
      while (problems.length < num_problems)
        problems.push(<td key={problems.length} />);

      final_score = final_score === null ? "N/a" : round(final_score, 4);
      return (
        <tr key={`${year}-${contestant.contestant.id}`}>
          <th>
            <Link to={`/contest/${year}`}>{year}</Link>
          </th>
          <td>
            <ContestantLink
              contestant={contestant.contestant}
              ioi={contestant.ioi}
            />
          </td>
          <td className="text-center">
            <MedalIcon color={contestant.medal} />
          </td>
          <td className="text-center">{contestant.rank || "N/a"}</td>
          <td>{final_score}</td>
          {problems}
        </tr>
      );
    });
  }

  renderResults(results: RegionResults) {
    const num_problems = Math.max(
      ...results.results.map(res =>
        Math.max(...res.contestants.map(cont => cont.task_scores.length))
      )
    );

    const years = _.orderBy(
      results.results,
      ["year", "rank"],
      ["desc", "asc"]
    ).map(year => this.renderResultsOfYear(year, num_problems));
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
                <th scope="col">Rank</th>
                <th scope="col">Score</th>
                <th colSpan={num_problems} className="text-center" scope="col">
                  Tasks
                </th>
              </tr>
            </thead>
            <tbody>{years}</tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.region || !this.state.results) return <Loading />;
    const { region } = this.state;

    return (
      <div>
        <div className="row p-2">
          <div className="col-12 text-center">
            <h2 className="text-danger">{region.name}</h2>
            {this.renderHosted(region.hosted)}
            <img
              className="mr-3 align-self-start img-fluid"
              src={`/static/regions/${region.navigation.current}.svg`}
              alt="Region"
              onError={(event: any) => {
                event.target.src = "/static/placeholder.jpg";
              }}
              width="125"
            />
          </div>
        </div>
        <Nav tabs className="mt-4">
          <NavItem className="ml-auto">
            <NavLink
              className={this.state.activeTab === "detail" ? "active" : ""}
              onClick={() => {
                this.changeTab("detail");
              }}
            >
              {" "}
              Participations
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink
              className={this.state.activeTab === "results" ? "active" : ""}
              onClick={() => {
                this.changeTab("results");
              }}
            >
              {" "}
              Results
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="p-2">
          <TabPane tabId="detail">{this.renderDetail(region)}</TabPane>
          <TabPane tabId="results">
            {this.renderResults(this.state.results)}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

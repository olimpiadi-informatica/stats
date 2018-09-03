import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchContest, fetchResults } from '../actions/contests'
// import { fetchResults } from '../actions/results'

class ContestContainer extends Component {

  componentDidMount() {
    const year = this.props.match.params.year
    this.props.fetchContest(year)
    this.props.fetchResults(year)
  }

  renderContestants(results) {
    if(!results) return (<div>Loading...</div>)

    return _.map(results.results, (result) => {

      let score = _.map(result.scores, (score,i) => {
        return <span key={result.contestant.id + i}>{score} </span>
      })

      let medal = result.medal ? <div>{result.medal}</div> : ''

      return(
        <div key={result.contestant.id}>
          <div>{result.rank}</div>
          <Link to={`/contestant/${result.contestant.id}`}>{result.contestant.first_name} {result.contestant.last_name}</Link>
          <div>{result.region}</div>
          <div>{ score } {result.score} { medal }</div>
        </div>
      )
    })
  }

  renderTasks(tasks) {
    return _.map(tasks, (task) => {
      return (
        <div key={task.name}>
          <Link to='/'>{task.name}</Link>
          <div>max_score_possible : {task.max_score_possible}</div>
        </div>
      )
    })
  }

  renderMedalsDetails(medal) {
    return(
      <div className="media">
        <img className="mr-3" src=".../64x64" alt="Generic placeholder image" />
        <div className="media-body">
          <h5 className="mt-0"> Number : {medal.number}</h5>
          <h6 className="mt-0"> Cutoff :{medal.cutoff}</h6>
        </div>
      </div>
    )
  }

  renderMedals(medals) {
    return(
      <div >
        <h3>Medals</h3>
        {this.renderMedalsDetails(medals.gold)}
        {this.renderMedalsDetails(medals.silver)}
        {this.renderMedalsDetails(medals.bronze)}
      </div>
    )
  }

  renderContest(contest,results) {
    const num_contestants = contest.num_contestants ? <div> num_contestants: {contest.num_contestants}</div> : ''
    const max_score_possible = contest.max_score_possible ? <div> max_score_possible: {contest.max_score_possible}</div> : ''
    const max_score = contest.max_score ? <div> max_score: {contest.max_score}</div> : ''
    const avg_score = contest.avg_score ? <div> avg_score: {contest.avg_score}</div> : ''

    return(
      <div>
        <div>
          <h3>Info</h3>
          <div>{num_contestants}</div>
          <div>{max_score_possible}</div>
          <div>{max_score}</div>
          <div>{avg_score}</div>
        </div>
        {this.renderMedals(contest.medals)}
        <div>
          <h3>Tasks</h3>
          {this.renderTasks(contest.tasks)}
        </div>
        <div>
          <h3>Results</h3>
          {this.renderContestants(results)}
        </div>

      </div>
    )
  }

  render() {
    const { contest } = this.props
    // const { result } = this.props
    console.log(contest);
    if (contest) console.log(contest.navigation);
    if (contest) console.log(contest.medals);
    if (contest) console.log(contest.results);
    if (contest) console.log(contest.region);
    if (!contest || !contest.navigation ) {
      return (<div>Loading......</div>)
    }
    const partecipants = contest.avg_score ? <div> avg_score: {contest.avg_score}</div> : ''

    return (
      <div>
        <div className='row'>
          <div className='col-12'>
            <h2>{contest.location.location} {contest.navigation.current.year}</h2>
          </div>
          <div className='col-12'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                {this.renderContest(contest, contest.results)}
              </div>
              <div className='col-12 col-md-6'>
                2
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps({ contests }, ownProps) {
  const year = ownProps.match.params.year
  if(contests[year]) console.log(contests[year].results);
  return { contest: contests[year] }
}

export default connect(mapStateToProps, { fetchContest, fetchResults })(ContestContainer)

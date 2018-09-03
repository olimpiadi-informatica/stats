import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchContests } from '../actions/contests'
import { Link } from 'react-router-dom'

class ContestsContainer extends Component {

  componentDidMount() {
    this.props.fetchContests()
  }

  renderContest(contests_r) {
    return _.map(contests_r, (contest) => {
      console.log(contest.year);
      const num_contestants = contest.num_contestants ? <div> num_contestants: {contest.num_contestants}</div> : ''
      const max_score_possible = contest.max_score_possible ? <div> max_score_possible: {contest.max_score_possible}</div> : ''
      const max_score = contest.max_score ? <div> max_score: {contest.max_score}</div> : ''
      const avg_score = contest.avg_score ? <div> avg_score: {contest.avg_score}</div> : ''
      return (
        <div key={contest.year}>
          <li className='list-group-item ' >
            <div className='row align-items-center'>
              <div className='col-12'>
                <Link to={`/contest/${contest.year}`}>{contest.location.location} {contest.year}</Link>
              </div>
              <div className='col-6'>
                <div>{num_contestants}</div>
                <div>{max_score_possible}</div>
                <div>{max_score}</div>
                <div>{avg_score}</div>
              </div>
              <div className='col-6'>
                Gold {contest.medals.gold.number}
                Silver {contest.medals.silver.number}
                Bronze {contest.medals.bronze.number}
              </div>
            </div>
          </li>
        </div>
      )
    })
  }

  render() {
    const {contests} = this.props
    if(!contests) return <div>Loading...</div>
    return (
      <div className='row'>
        <h2 className='col-12'>Contests</h2>
        <ul className='list-group col-12 col-md-6'>
          {this.renderContest(contests)}
        </ul>
        <div className='col-12 col-md-6'>
          <div className='row'>
            <div className='col-12'>Mappa</div>
            <div className='col-12'>Altre stats</div>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { contests: state.contests }
}

export default connect(mapStateToProps, { fetchContests })(ContestsContainer)

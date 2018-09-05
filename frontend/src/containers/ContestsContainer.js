import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchContests } from '../actions/contests'
import { Link } from 'react-router-dom'

import { ContestListItem } from '../components'

class ContestsContainer extends Component {

  componentDidMount() {
    this.props.fetchContests()
  }

  renderContest(contests_r) {
    if(!contests_r) return <div className='Loading'>Loading ...</div>
    return _.map(contests_r, (contest, i) => {
      return <ContestListItem key={contest.year + i} contest={contest}/>
    })
  }

  render() {
    const {contests} = this.props
    const {error} = this.props
    if(error) return <div>{error}</div>
    if(!contests) return <div className='Loading'>Loading ...</div>
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
  if(state.contests && state.contests.error) return {error : 'Connection Error'}
  return { contests: state.contests }
}

export default connect(mapStateToProps, { fetchContests })(ContestsContainer)

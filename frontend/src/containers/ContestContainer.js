import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchContest, fetchResults } from '../actions/contests'
import { ContestItem } from 'components'

class ContestContainer extends Component {

  componentDidMount() {
    const year = this.props.match.params.year
    this.props.fetchContest(year)
    this.props.fetchResults(year)
  }

  render() {
    const { contest } = this.props

    if (!contest || !contest.navigation ) return <div className='Loading'>Loading ...</div>
    return (
      <div className='row'>
        <div className='col-12 col-md-6'>
          <ContestItem contest={contest} results={contest.results}/>
        </div>
        <div className='col-12 col-md-6'>
          2
        </div>
      </div>
    )
  }
}

function mapStateToProps({ contests }, ownProps) {
  const year = ownProps.match.params.year
  return { contest: contests[year] }
}

export default connect(mapStateToProps, { fetchContest, fetchResults })(ContestContainer)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContest } from '../actions/contests'

class ContestContainer extends Component {

  componentDidMount() {
    const year = this.props.match.params.year
    this.props.fetchContest(year)
  }
  render() {
    const { contest } = this.props

    if (!contest) {
      return (<div>Loading..</div>)
    }

    return (
      <div>
        {contest.details.year}
      </div>
    )
  }
}

function mapStateToProps({ contests }, ownProps) {
  return { contest: contests[ownProps.match.params.year] }
}

export default connect(mapStateToProps, { fetchContest })(ContestContainer)

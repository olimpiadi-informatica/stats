import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchContestat } from '../actions/contestants'


class ContestantContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchContestat(id)
  }

  render() {
    if(!this.props.contestant) return <div>Loading...</div>

    const {contestant} = this.props.contestant
    const {participations} = this.props.contestant

    return (
      <div>{contestant.first_name} {contestant.last_name}</div>
    )
  }
}

function mapStateToProps({ contestants }, ownProps) {
  const id = ownProps.match.params.id
  return { contestant : contestants[id]}
}

export default connect(mapStateToProps, {fetchContestat})(ContestantContainer)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchContestats } from '../actions/contestants'

class ContestantsContainer extends Component {

  componentDidMount() {
    this.props.fetchContestats()
  }

  renderContestants(contestants) {
    if (!contestants) { return <div>Loading...</div>}

      return _.map(contestants, (contestant) => {
        const partecipations = _.map(contestant.participations, (partecipation,i) => {
          return (<span key={contestant + i}>{partecipation.year} </span>)
        })
        return(
          <div key={contestant.contestant.id}>
            <Link to={`/contestant/${contestant.contestant.id}`}>{contestant.contestant.first_name} {contestant.contestant.last_name}</Link>
            <div>{partecipations}</div>
          </div>
        )
      })
    }

    render() {
      const {contestants} = this.props

      return (
        <div>
          {this.renderContestants(contestants)}
        </div>
      )
    }
  }
  function mapStateToProps(state) {
    return { contestants: state.contestants }
  }

  export default connect(mapStateToProps, { fetchContestats })(ContestantsContainer)

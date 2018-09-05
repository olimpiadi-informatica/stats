import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchContestats } from '../actions/contestants'
import { ContestantListItem } from '../components'

class ContestantsContainer extends Component {

  componentDidMount() {
    this.props.fetchContestats()
  }

  renderContestants(contestants) {
    if (!contestants) { return <div>Loading...</div>}
      return _.map(contestants, (contestant) => {
        return <ContestantListItem key={contestant.contestant.id} contestant={contestant} />
      })
    }

    render() {
      const {contestants} = this.props
      if(!contestants) return <div className='Loading'>Loading ...</div>

      return (
        <div className='row'>
          <div className='col-12'>
            <h3>Contestants</h3>
          </div>
          <ul className='col-12 col-md-6 list-group'>
            {this.renderContestants(contestants)}
          </ul>
          <div className='col-12 col-md-6'>
            Grafici
          </div>
        </div>
      )
    }
  }
  function mapStateToProps(state) {
    return { contestants: state.contestants }
  }

  export default connect(mapStateToProps, { fetchContestats })(ContestantsContainer)

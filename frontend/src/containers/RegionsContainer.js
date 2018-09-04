import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchRegions } from '../actions/regions'
import { Link } from 'react-router-dom'

import { RegionListItem } from 'components'

class RegionsContainer extends Component {
  componentDidMount() {
    this.props.fetchRegions()
  }

  renderRegions(regions) {
    if(!regions) return <div className='Loading'>Loading ...</div>
    return _.map(regions, (region) => {
      return (
          <RegionListItem  region={region} key={region.id} />
      )
    })
  }

  render() {
    const {regions} = this.props
    if(!regions) return <div className='Loading'>Loading ...</div>
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>Regions</h3>
        </div>
        <ul className='list-group'>
          {this.renderRegions(regions)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { regions: state.regions }
}

export default connect(mapStateToProps, { fetchRegions })(RegionsContainer)

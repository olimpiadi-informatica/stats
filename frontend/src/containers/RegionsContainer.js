import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchRegions } from '../actions/regions'
import { Link } from 'react-router-dom'

class RegionsContainer extends Component {
  componentDidMount() {
    this.props.fetchRegions()
  }

  renderRegions(regions) {
    return _.map(regions, (region) => {
      return (
          <div key={region.id}>
            <Link  to={`/region/${region.id}`}>{region.id}</Link>
          </div>
      )
    })
  }

  render() {
    const {regions} = this.props
    console.log(regions);
    if(!regions) return <div>Loading ...</div>
    return (
      <div>{this.renderRegions(regions)}</div>
    )
  }
}

function mapStateToProps(state) {
  return { regions: state.regions }
}

export default connect(mapStateToProps, { fetchRegions })(RegionsContainer)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { fetchRegion, fetchRegionResults } from '../actions/regions'

class RegionContainer extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id
    this.props.fetchRegion(id)
    this.props.fetchRegionResults(id)
  }

  renderResults(results) {
    console.log(results);
    if(!results) return <div>Nessun Risultato</div>
    return (
      <div>Results</div>
    )
  }

  render() {
    const {region} = this.props
    if(!region) return <div>Loading ...</div>

    return (
      <div>
        <div>{region.name}</div>
        {this.renderResults(region.region_results)}
      </div>
    )
  }
}

function mapStateToProps({regions}, ownProps) {
  const id = ownProps.match.params.id
  console.log(regions[id]);
  return { region: regions[id]}
}
export default connect(mapStateToProps, { fetchRegion, fetchRegionResults })(RegionContainer)

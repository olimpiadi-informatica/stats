import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { fetchRegion, fetchRegionResults } from '../actions/regions'

class RegionContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchRegion(id)
    this.props.fetchRegionResults(id)
  }

  renderMedalsPerYear(medals_per_year) {
    if(!medals_per_year) return <div className='Loading'>Loading ...</div>
    return _.map(medals_per_year, (medals, i) => {
      return (
        <div key={`medal${i}`}>
          <h5>{medals.year}</h5>
          <div>Gold : {medals.num_medals.gold}</div>
          <div>Silver : {medals.num_medals.silver}</div>
          <div>Bronze : {medals.num_medals.bronze}</div>
        </div>
      )
    })
  }

  renderResultsPerYear(results_per_year) {
    console.log(results_per_year);
    if(!results_per_year) return <div className='Loading'>Loading ...</div>
    return _.map(results_per_year, (results, i) => {
      return (
        <div key={`results${i}`}>
          <h5>{results.year}</h5>
          {_.map(results.contestants, (contestant, i) => {
            <div key={`resultscontestants${i}`}>Ciao</div>
          })}
        </div>
      )
    })
  }

  renderRegion(region) {
    if(!region) return <div className='Loading'>Loading ...</div>
    const avg_contestants_per_year = region.avg_contestants_per_year ? <div>avg_contestants_per_year {region.avg_contestants_per_year}</div> : ''
    const results_per_year = region.region_results ? <div>{this.renderResultsPerYear(region.region_results.results)}</div> : ''
    console.log(region.region_results);
    return (
      <div >
        <h3>Medals</h3>
        {this.renderMedalsPerYear(region.medals_per_year)}
        {results_per_year}
      </div>
    )
  }

  renderResults(results) {
    if(!results) return <div>Nessun Risultato</div>
    return (
      <div>Results</div>
    )
  }

  changeActiveTab(name) {
    console.log(name);
  }

  render() {
    const { region } = this.props
    if(!region || !region.navigation) return <div className='Loading'>Loading ...</div>
    console.log(region);
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>{region.name}</h3>
          <nav className="nav nav-pills nav-justified">
            <a className="nav-item nav-link active" onClick={ () => {this.changeActiveTab('medals')}} >Medals</a>
            <a className="nav-item nav-link" onClick={ () => {this.changeActiveTab('medals')}} >Results</a>
            <a className="nav-item nav-link " onClick={ () => {this.changeActiveTab('Contestants')}} >Contestants</a>
          </nav>
          {this.renderRegion(region)}
        </div>
      </div>
    )
  }
}

function mapStateToProps({regions}, ownProps) {
  const id = ownProps.match.params.id
  return { region: regions[id], activeTab : 'medals'}
}
export default connect(mapStateToProps, { fetchRegion, fetchRegionResults })(RegionContainer)

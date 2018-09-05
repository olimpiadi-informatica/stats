import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchTask } from '../actions/tasks'

class TaskContainer extends Component {
  componentDidMount() {
    const year = this.props.match.params.year
    const name = this.props.match.params.name
    this.props.fetchTask(year,name)
  }

  renderScores(scores) {
    if(!scores) return <div className='Loading'></div>
    return _.map(scores, (score, i) => {
      const score_point = score.score ? <div>Score {score.score}</div> : ''
      const rank = score.rank ? <div>Rank {score.rank}</div> : ''
      return (
        <li key={i} className='list-group-item'>
          <Link to={`/contestant/${score.contestant.id}`}>{score.contestant.first_name} {score.contestant.last_name}</Link>
          {score_point}
          {rank}
        </li>
      )
    })
  }

  render() {
    const {task} = this.props
    if(!task)  return <div className='Loading'>Loading ...</div>
    console.log(task);
    const max_score_possible = task.max_score_possible ? <div>max_score_possible : {task.max_score_possible}</div> : ''
    const link = task.link ? <h5><Link to={task.link}> Test this problem </Link></h5> : ''

    return (
      <div className='TaskContainer row'>
        <div className='col-12 col-md-6'>
          <h3>{task.title}</h3>
          {link}
          {max_score_possible}
          <ul className='list-group'>
            {this.renderScores(task.scores)}
          </ul>
        </div>
        <div className='col-12 col-md-6'>
          Grafi
        </div>
      </div>
    )
  }
}

function mapStateToProps({ tasks }, ownProps) {
  const year = ownProps.match.params.year
  const name = ownProps.match.params.name
  return { task: tasks[year + '-' + name]}
}


export default connect(mapStateToProps, { fetchTask })(TaskContainer)

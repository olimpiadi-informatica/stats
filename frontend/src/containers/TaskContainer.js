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

  render() {
    const {task} = this.props
    if(!task) return <div>Loading...</div>

    return (
      <div>
        {task.title}
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

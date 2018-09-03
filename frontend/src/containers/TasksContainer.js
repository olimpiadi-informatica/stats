import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchTasks } from '../actions/tasks'

class TasksContainer extends Component {
  componentDidMount() {
    this.props.fetchTasks()
  }

  renderTask(tasks,year) {
    return _.map(tasks, (task,i) => {
      return (
        <div key={task.name+year}>
          <Link to={`/task/${year}/${task.name}`}   >{task.title}</Link>
        </div>
      )
    })
  }

  renderTasksPerYear(tasks_per_year) {
    return _.map(tasks_per_year, (value,key) => {
      return (
        <div key={key}>
          {key}
          {this.renderTask(value,key)}
        </div>
      )
    })
  }

  render() {
    if(!this.props.tasks) return <div>Loading...</div>
    const {tasks} = this.props
    return (
      <div>
        {this.renderTasksPerYear(tasks)}
      </div>
    )
  }
}

function mapStateToProps({tasks}) {
  let task_per_year = {}
  _.map(tasks, (value,key) => {
    if(! task_per_year[key.split('-')[0]]) task_per_year[key.split('-')[0]] = []
    task_per_year[key.split('-')[0]].push(value)
  })
  return { tasks: task_per_year }
}

export default connect(mapStateToProps, { fetchTasks })(TasksContainer)

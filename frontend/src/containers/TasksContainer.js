import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchTasks } from '../actions/tasks'
import { TaskListItem } from '../components'

class TasksContainer extends Component {
  componentDidMount() {
    this.props.fetchTasks()
  }

  renderTask(tasks,year) {
    return _.map(tasks, (task,i) => {
      return (
        <TaskListItem key={`${task.name}${year}`} task={task} year={year}/>
      )
    })
  }

  renderTasksPerYear(tasks_per_year) {
    return _.map(tasks_per_year, (value,key) => {
      return (
        <div key={key}>
          <h4 >{key}</h4>
          <ul className='list-group'>
            {this.renderTask(value,key)}
          </ul>

        </div>
      )
    })
  }

  render() {
    if(!this.props.tasks) return <div>Loading...</div>
    const {tasks} = this.props
    return (
      <div className='TasksContainer row'>
        <div className='col-12 col-md-6'>
          {this.renderTasksPerYear(tasks)}
        </div>
        <div className='col-12 col-md-6'>
          Grafo
        </div>
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

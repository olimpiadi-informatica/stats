import React from 'react'
import { Link } from 'react-router-dom'

const TaskListItem = ({task}) => {
  if(!task) return <div className='Loading'>Loading ...</div>

  return (
    <li className='TaskListItemContainer list-group-item'>
      <Link to='/'>{task.name}</Link>
      <div>max_score_possible : {task.max_score_possible}</div>
    </li>
  )
}

export default TaskListItem

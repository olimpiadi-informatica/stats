import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { TaskListItem } from '../components'


function renderResults(results) {
  if(!results) return <div className='Loading'>Loading ...</div>
  return _.map(results.results, (result) => {

    let score = _.map(result.scores, (score,i) => {
      return <span key={result.contestant.id + i}>{score} </span>
    })

    let medal = result.medal ? <div>{result.medal}</div> : ''

    return(
      <li className='list-group-item' key={result.contestant.id}>
        <div>Rank : {result.rank}</div>
        <Link to={`/contestant/${result.contestant.id}`}>{result.contestant.first_name} {result.contestant.last_name}</Link>
        <div>{result.region}</div>
        <div>{ score } {result.score} { medal }</div>
      </li>
    )
  })
}

function renderMedalsDetails(medal) {
  return(
    <div className="media">
      <img className="mr-3" src=".../64x64" alt="Generic placeholder image" />
      <div className="media-body">
        <h5 className="mt-0"> Number : {medal.number}</h5>
        <h6 className="mt-0"> Cutoff :{medal.cutoff}</h6>
      </div>
    </div>
  )
}

function renderTasks(tasks, year) {
  return _.map(tasks, (task) => {
    return (
      <div key={task.name}>
        <TaskListItem task={task} year={year}/>
      </div>
    )
  })
}

const ContestItem = ({contest, results}) => {
  if(!contest) return <div className='Loading'>Loading ...</div>

  const num_contestants = contest.num_contestants ? <div> num_contestants: {contest.num_contestants}</div> : ''
  const max_score_possible = contest.max_score_possible ? <div> max_score_possible: {contest.max_score_possible}</div> : ''
  const max_score = contest.max_score ? <div> max_score: {contest.max_score}</div> : ''
  const avg_score = contest.avg_score ? <div> avg_score: {contest.avg_score}</div> : ''


  return(
    <div className='ContestItemContainer'>
      <div className='row'>
        <div className='col-12'>
          <h2>{contest.location.location} {contest.navigation.current.year}</h2>
        </div>
        <div className='col-12'>
          <div>
            <h3>Info</h3>
            <div>{num_contestants}</div>
            <div>{max_score_possible}</div>
            <div>{max_score}</div>
            <div>{avg_score}</div>
          </div>
          <div >
            <h3>Medals</h3>
            {renderMedalsDetails(contest.medals.gold)}
            {renderMedalsDetails(contest.medals.silver)}
            {renderMedalsDetails(contest.medals.bronze)}
          </div>
          <div>
            <h3>Tasks</h3>
            <ul className='list-group'>
              {renderTasks(contest.tasks, contest.navigation.current)}
            </ul>

          </div>
          <div>
            <h3>Results</h3>
            <ul className='list-group'>
              {renderResults(results)}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContestItem

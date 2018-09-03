import React from 'react'
// import { CounterContainer } from 'containers'
import { ContestsContainer, ContestContainer } from 'containers'
import { ContestantsContainer, ContestantContainer } from 'containers'
import { TasksContainer, TaskContainer } from 'containers'
import { RegionsContainer, RegionContainer } from 'containers'
import { Header } from 'components'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

// const Container = styled.div`text-align: center;`

function Routes() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header></Header>
          <Switch>
            <Route path="/contests" component={ContestsContainer} />
            <Route path="/contest/:year" component={ContestContainer} />
            <Route path="/contestant/:id" component={ContestantContainer} />
            <Route path="/contestants" component={ContestantsContainer} />
            <Route path="/tasks" component={TasksContainer} />
            <Route path="/task/:year/:name" component={TaskContainer} />
            <Route path="/regions" component={RegionsContainer} />
            <Route path="/region/:id" component={RegionContainer} />
            <Route path="/" component={ContestsContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default Routes

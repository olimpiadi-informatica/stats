import React from 'react'
// import { CounterContainer } from 'containers'
import { ContestsContainer } from 'containers'
import { ContestContainer } from 'containers'
import { Header } from 'components'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

// const Container = styled.div`text-align: center;`

function Routes() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/contests" component={ContestsContainer} />
          <Route path="/contest/:year" component={ContestContainer} />
          <Route path="/" component={ContestsContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes

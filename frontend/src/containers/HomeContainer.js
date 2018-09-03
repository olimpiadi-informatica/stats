import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class HomeContainer extends Component {
  render() {
    return (
      <div className='HomeContainer'>
        <div className='row m-2'>

          <div className='col-12 col-md-7'>
            <div className="jumbotron ">
              <h1 className="display-4">Hello, world!</h1>
              <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr className="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </div>
          </div>

          <div className='col-12 col-md-5'>
            Placeholder 1
          </div>

          <div className='col-12 col-md-5'>
            Placeholder 2
          </div>

          <div className='col-12 col-md-7'>
            Placeholder 3
          </div>
        </div>
      </div>
    )
  }
}

export default HomeContainer

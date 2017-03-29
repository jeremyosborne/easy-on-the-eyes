/**
 * Input a URL and navigate to it.
 */

import './home.css'

import NavForm from './navform'
import React from 'react'
import Suggestions from './suggestions'

export class Home extends React.Component {
  render () {
    return (
      <div className='home'>
        <NavForm />
        <br />
        <Suggestions />
      </div>
    )
  }
}

export default Home

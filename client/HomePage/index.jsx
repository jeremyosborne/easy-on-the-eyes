/**
 * Input a URL and navigate to it.
 */

import './index.css'

import NavForm from 'ContentLoadForm'
import React from 'react'
import SuggestionsList from 'SuggestionsList'

export class HomePage extends React.Component {
  render () {
    return (
      <div className='home'>
        <NavForm.rf />
        <br />
        <SuggestionsList />
      </div>
    )
  }
}

export default HomePage

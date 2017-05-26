/**
 * Input a URL and navigate to it.
 */

import NavForm from 'ContentLoadForm'
import React from 'react'
import SuggestionsList from 'SuggestionsList'

import styles from './index.css'  // eslint-disable-line no-unused-vars

export class HomePage extends React.Component {
  render () {
    return (
      <div styleName='styles.home'>
        <NavForm.rf />
        <br />
        <SuggestionsList />
      </div>
    )
  }
}

export default HomePage

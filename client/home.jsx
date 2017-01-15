/**
 * Input a URL and navigate to it.
 */

require('./home.css')
import NavForm from './navform.jsx'
import React from 'react'
import Suggestions from './suggestions.jsx'

const Home = React.createClass({
  render: function () {
    return (
      <div className='home'>
        <NavForm />
        <br />
        <Suggestions />
      </div>
    )
  }
})

export default Home

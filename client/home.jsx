/**
 * Input a URL and navigate to it.
 */

require('./home.css')

import AppBar from 'material-ui/AppBar'
import NavForm from './navform'
import React from 'react'
import Suggestions from './suggestions'

const Home = React.createClass({
  render: function () {
    return (
      <div>
        <AppBar
          title='Easy on the eyes'
          iconClassNameLeft=''
          iconClassNameRight=''
        />
        <div className='home'>
          <NavForm />
          <br />
          <Suggestions />
        </div>
      </div>
    )
  }
})

export default Home

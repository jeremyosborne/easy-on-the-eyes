import AppBar from 'material-ui/AppBar'
import React from 'react'
import history from 'history'
import Notifications from 'Notifications'

import './index.css'

export class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div className='app'>
        <AppBar
          title={<span className='app-title'>Easy on the eyes</span>}
          onTitleTouchTap={() => history.push('/')}
          iconClassNameLeft=''
          iconClassNameRight=''
          showMenuIconButton={false}
        />
        {this.props.children}
        <Notifications />
      </div>
    )
  }
}

export default App

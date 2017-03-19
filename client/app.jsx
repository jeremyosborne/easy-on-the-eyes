import AppBar from 'material-ui/AppBar'
import React from 'react'
import history from './history'
import Notifications from './Notifications'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <AppBar
          title='Easy on the eyes'
          onTitleTouchTap={() => history.push('/')}
          iconClassNameLeft=''
          iconClassNameRight=''
          showMenuIconButton={false}
        />
        {this.props.main}
        <Notifications />
      </div>
    )
  }
}

App.propTypes = {
  main: React.PropTypes.node
}

export default App

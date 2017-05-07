import AppBar from 'material-ui/AppBar'
import React from 'react'
import history from './history'
import Notifications from './Notifications'

export class App extends React.Component {
  static propTypes = {
    main: React.PropTypes.node
  }

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

export default App

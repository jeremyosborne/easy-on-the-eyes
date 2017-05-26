import AppBar from 'material-ui/AppBar'
import PropTypes from 'prop-types'
import React from 'react'
import history from 'history'
import Notifications from 'Notifications'

import styles from './index.scss'  // eslint-disable-line no-unused-vars

export class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div>
        <AppBar
          title={<span styleName='styles.app-title'>Easy on the eyes</span>}
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

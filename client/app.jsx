import AppBar from 'material-ui/AppBar'
import React from 'react'
import history from './history'

const App = React.createClass({
  render: function () {
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
      </div>
    )
  }
})

export default App

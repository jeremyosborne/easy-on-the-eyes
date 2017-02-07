require('./index.css')

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// ES2015 support. Someday in a not distant future we can get rid of this.... yeah right.
import 'babel-polyfill'

import App from './app'
import Content from './content'
import Home from './home'
import history from './history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'

ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={syncHistoryWithStore(history, store)}>
        <Route path='/' component={App}>
          <IndexRoute components={{main: Home}} />
          <Route path='content' components={{main: Content}} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'))

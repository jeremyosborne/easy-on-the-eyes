import injectTapEventPlugin from 'react-tap-event-plugin'
import App from 'App'
import ContentPage from 'ContentPage'
import HomePage from 'HomePage'
import history from './history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {IndexRoute, Route, Router} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import store from './store'
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// int main(void)
Promise.resolve().then(() => {
  ReactDOM.render((
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={syncHistoryWithStore(history, store)}>
          <Route path='/' component={App}>
            <IndexRoute component={HomePage} />
            <Route path='content/:contentHref' component={ContentPage} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  ), document.getElementById('root'))
})

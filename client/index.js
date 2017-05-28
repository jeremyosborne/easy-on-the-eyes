import injectTapEventPlugin from 'react-tap-event-plugin'
// ES2015 support. Someday in a not distant future we can get rid of this.... yeah right.
import 'babel-polyfill'
import App from 'App'
import {fetchContent} from 'content'
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
import url from 'url'
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
            <Route path='content' component={ContentPage} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  ), document.getElementById('root'))
}).then(() => {
  // If on load we have content designated as part of our url state, load it.
  const href = url.parse(window.location.href, true).query.url
  if (href) {
    store.dispatch(fetchContent({href}))
  }
})

require('./index.css')

import App from './app.jsx'
import Content from './content.jsx'
import NavForm from './navform.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router'
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={NavForm} />
        <Route path='/content' component={Content} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app-container'))

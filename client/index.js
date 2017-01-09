require('./index.css')

import Content from './content.jsx'
import NavForm from './navform.jsx'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import reducers from './reducers'

let App = React.createClass({
  render: function () {
    return (
      <div className='app'>
        {this.props.children}
      </div>
    )
  }
})
const mapContentToProps = function (state) {
  return { content: state.content }
}
App = connect(mapContentToProps)(App)

const store = createStore(reducers,
  window.initialState || {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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

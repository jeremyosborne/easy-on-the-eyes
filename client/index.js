require('./reader.css')

import Content from './content.jsx'
import LinkInterceptor from './linkinterceptor.jsx'
import NavForm from './navform.jsx'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import reducers from './reducers'

let App = React.createClass({
  render: function () {
    return (
      <LinkInterceptor>
        <NavForm />
        <Content />
      </LinkInterceptor>
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
    <App />
  </Provider>
), document.getElementById('app'))

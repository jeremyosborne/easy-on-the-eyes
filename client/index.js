require('./reader.css')

import Content from './content.jsx'
import LinkInterceptor from './linkinterceptor.jsx'
import NavForm from './navform.jsx'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reducers from './reducers'

const App = React.createClass({
  render: function () {
    return (
      <LinkInterceptor>
        <NavForm content={this.props.content} />
        <Content content={this.props.content} />
      </LinkInterceptor>
    )
  }
})

const store = createStore(reducers,
  window.initialState || {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render((
  <Provider store={store}>
    {/* TODO: Unmuddle this with redux, current code still relies on this. */}
    <App content={window.initialState.content} />
  </Provider>
), document.getElementById('app'))

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

const store = createStore(reducers)

ReactDOM.render((
  <Provider store={store}>
    <App content={window.content} />
  </Provider>
), document.getElementById('app'))

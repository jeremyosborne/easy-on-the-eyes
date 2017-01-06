require('./reader.css')
import React from 'react'
import ReactDOM from 'react-dom'
import Content from './content.jsx'
import LinkInterceptor from './linkinterceptor.jsx'
import NavForm from './navform.jsx'

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

ReactDOM.render((
  <App content={window.content} />
), document.getElementById('app'))

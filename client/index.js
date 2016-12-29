require('./reader.css')
var React = require('react')
var ReactDOM = require('react-dom')
var Content = require('./content.jsx')
var LinkInterceptor = require('./linkinterceptor.jsx')
var NavForm = require('./navform.jsx')

var App = React.createClass({
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

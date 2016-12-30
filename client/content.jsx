var React = require('react')

var Content = React.createClass({
  propTypes: {
    // Dangerous html friendly object.
    content: React.PropTypes.object
  },
  getDefaultProps: function () {
    const content = Object.freeze({
      __html: null
    })
    return {
      content: content
    }
  },
  render: function () {
    return (
      <div className='content' dangerouslySetInnerHTML={this.props.content} />
    )
  }
})

module.exports = Content

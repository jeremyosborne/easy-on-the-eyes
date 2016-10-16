var React = require('react')

var Content = React.createClass({
  render: function () {
    return (
      <div className='content' dangerouslySetInnerHTML={this.props.content} />
    )
  }
})

Content.propTypes = {
  // Dangerous html friendly object.
  content: React.PropTypes.object
}

module.exports = Content

var React = require('react')

var Content = React.createClass({
  render: function () {
    return (
      <div className='content' dangerouslySetInnerHTML={this.props.content} />
    )
  }
})

Content.propTypes = {
  content: React.PropTypes.string
}

module.exports = Content

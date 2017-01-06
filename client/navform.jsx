import React from 'react'
import classNames from 'classnames'
import qs from 'querystring'

const NavForm = React.createClass({
  propTypes: {
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
  getInitialState: function () {
    return {
      fields: {}
    }
  },
  handleChange: function (e) {
    var fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState('fields', fields)
  },
  submit: function (e) {
    e.preventDefault()
    window.location.href = qs.stringify(this.state.fields)
  },
  render: function () {
    var classes = classNames('nav', {
      hide: this.props.content.__html
    })
    return (
      <form className={classes} onSubmit={this.submit}>
        <label htmlFor='url'>
          What do you want to read today?
        </label>
        <br />
        <input type='url' name='url' id='url' />
        <input type='submit' />
        <br />
        <div className='starting-points'>
          <p>
            Some starting points:
          </p>
          <ul>
            <li>
              <a href='https://en.wikipedia.org/wiki/Umberto_Eco'>Umberto Eco</a>
            </li>
            <li>
              <a href='https://en.wikipedia.org/wiki/Sephirot'>Sephirot</a>
            </li>
            <li>
              <a href='https://en.wikipedia.org/wiki/Semantics'>Semantics</a>
            </li>
            <li>
              <a href='https://en.wikipedia.org/wiki/Maternal_insult'>"Your Mom..." Jokes</a>
            </li>
          </ul>
        </div>
      </form>
    )
  }
})

export default NavForm

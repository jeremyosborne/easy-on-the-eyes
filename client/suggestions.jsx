/**
 * Suggested links that when clicked will be "clean" displayed.
 */

require('./suggestions.css')

import LinkInterceptor from './linkinterceptor.jsx'
import React from 'react'

const Suggestions = React.createClass({
  render: function () {
    return (
      <LinkInterceptor {...this.props}>
        <div className='suggestions'>
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
      </LinkInterceptor>
    )
  }
})

export default Suggestions

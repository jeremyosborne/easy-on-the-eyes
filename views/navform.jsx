var React = require('react')

var NavForm = React.createClass({
  render: function () {
    return (
      <form className='nav' action='javascript:void(0);'>
        <label htmlFor='u'>
          What do you want to read today?
        </label>
        <br />
        <input type='url' name='u' id='u' />
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

module.exports = NavForm

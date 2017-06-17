/**
 * Suggested links that when clicked will be "clean" displayed.
 */

import LinkInterceptor from 'LinkInterceptor'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {compose, bindActionCreators} from 'redux'
import * as suggestions from 'suggestions'

import styles from './index.css'  // eslint-disable-line no-unused-vars

export class SuggestionsList extends React.Component {
  componentDidMount () {
    this.props.actions.load()
  }

  render () {
    return (
      <LinkInterceptor>
        <List styleName='styles.suggestions'>
          <Subheader>
            Some starting points:
          </Subheader>
          <Divider />
          {this.props.suggestions.list.map((s, i) => {
            return (
              <ListItem key={i}>
                <div styleName='styles.suggestion'>{s.content.text}</div>
                {s.content.tags.map((t, i) => (
                  t.href ? <span styleName='styles.tag'><a href={t.href}>{t.title}</a></span> : <span styleName='styles.tag'>{t.title}</span>
                ))}
              </ListItem>
            )
          })}
        </List>
      </LinkInterceptor>
    )
  }
}

SuggestionsList.propTypes = {
  actions: PropTypes.object,
  suggestions: PropTypes.object,
}

export const mapStateToProps = (state) => {
  return {
    suggestions: suggestions.selector(state)
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      load: suggestions.load,
    }, dispatch)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SuggestionsList)

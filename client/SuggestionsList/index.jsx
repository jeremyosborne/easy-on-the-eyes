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
import {compose} from 'redux'
import * as suggestions from 'suggestions'

import styles from './index.css'  // eslint-disable-line no-unused-vars

export const SuggestionsList = function (props) {
  return (
    <LinkInterceptor>
      <List styleName='styles.suggestions'>
        <Subheader>
          Some starting points:
        </Subheader>
        <Divider />
        {props.suggestions.list.map((s) => {
          return (
            <ListItem key={s.href}>
              <a href={s.href}>{s.title}</a>
            </ListItem>
          )
        })}
      </List>
    </LinkInterceptor>
  )
}

SuggestionsList.propTypes = {
  suggestions: PropTypes.object,
}

export const mapStateToProps = (state) => {
  return {
    suggestions: suggestions.selector(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(SuggestionsList)

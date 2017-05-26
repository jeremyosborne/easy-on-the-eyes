/**
 * Suggested links that when clicked will be "clean" displayed.
 */

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import LinkInterceptor from 'LinkInterceptor'
import React from 'react'

import styles from './index.css'  // eslint-disable-line no-unused-vars

export const SuggestionsList = function () {
  return (
    <LinkInterceptor>
      <List styleName='suggestions'>
        <Subheader>
          Some starting points:
        </Subheader>
        <Divider />
        <ListItem>
          <a href='https://en.wikipedia.org/wiki/Umberto_Eco'>Umberto Eco</a>
        </ListItem>
        <ListItem>
          <a href='https://en.wikipedia.org/wiki/Sephirot'>Sephirot</a>
        </ListItem>
        <ListItem>
          <a href='https://en.wikipedia.org/wiki/Semantics'>Semantics</a>
        </ListItem>
        <ListItem>
          <a href='https://en.wikipedia.org/wiki/Maternal_insult'>"Your Mom..." Jokes</a>
        </ListItem>
      </List>
    </LinkInterceptor>
  )
}

export default SuggestionsList

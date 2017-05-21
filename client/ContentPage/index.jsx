import ContentReader from 'ContentReader'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

import './index.css'

export class ContentPage extends React.Component {
  render () {
    return (
      <div className='content-page'>
        <ContentReader />
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {}
}

export const mapDispatchToProps = (dispatch) => {
  return {}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ContentPage)

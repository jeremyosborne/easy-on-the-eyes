import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export class Notifications extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    actions: PropTypes.object,
  }

  static defaultProps = {
    open: false,
    actions: {
      closeNotification: () => {}
    }
  }

  render () {
    return (
      <Snackbar
        open={this.props.open}
        message='Event added to your calendar'
        autoHideDuration={2200}
        onRequestClose={this.props.actions.closeNotification}
      />
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    // todo...
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      // todo...
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

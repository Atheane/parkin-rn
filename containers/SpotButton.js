import React from 'react'
import SpotButton from '../components/SpotButton'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { emitGiveSpot } from '../actions'
import withLocation from '../HOC/withLocation'

const mapDispatchToProps = (dispatch) => {
  return {
    emitGiveSpot: (socket, location, token) => {
      dispatch(emitGiveSpot(socket, location, token))
    }
  }
}

const mapReduxStateToProps = (reduxState) => {
  console.log(reduxState)
  return {
    facebookJson: reduxState.facebookJson,
    socket: reduxState.socket
  }
}

export default compose(
  connect(
    mapReduxStateToProps,
    mapDispatchToProps,
  ),
  withLocation,
  withHandlers({ 
    handleOnPress: props => e => {
      const { socket, facebookJson } = props
      const token = facebookJson.id
      props.getLocationAsync().then(location => {
        console.log(location)
        props.emitGiveSpot(socket, location, token)
      }).catch(error => console.log("getLocationAsync in containers/SpotButton.js", error))
    }
  })
)(React.memo(SpotButton)) 

import React from 'react'
import MarkerList from '../components/MarkerList'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { emitSelectSpot, setWatchId, emitMovingUserPosition } from '../actions'
import withLocation from '../HOC/withLocation'

const mapDispatchToProps = (dispatch) => {
  return {
    emitSelectSpot: (socket, location, token) => {
      dispatch(emitSelectSpot(socket, location, token))
    },
    setWatchId: (watchId) => {
      dispatch(setWatchId(watchId))
    },
  }
}

const mapReduxStateToProps = (reduxState) => {
  console.log(reduxState)
  return {
    facebookJson: reduxState.facebookJson,
    socket: reduxState.socket,
    spots: reduxState.spots,
    watchId: reduxState.watchId
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
      const location = e.nativeEvent.coordinate
      props.emitSelectSpot(socket, location, token)
      const watchId = props.watchLocationAsync(token)
      if (watchId !== undefined) {
        props.setWatchId(watchId)
      }
      props.handleGetDirections(e)
      e.persist()
    }
  }),
  lifecycle({
    componentWillUnmount() {
      // console.log("MarkerList will unmount")
      if (this.props.watchId) {
        this.props.watchId.remove()
      }
    }
  }),
)(React.memo(MarkerList)) 

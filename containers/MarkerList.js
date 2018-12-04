import React from 'react'
import MarkerList from '../components/MarkerList'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { emitSelectSpot, setWatchId } from '../actions'
import withLocation from '../HOC/withLocation'

const mapDispatchToProps = (dispatch) => {
  return {
    emitSelectSpot: (socket, location, token) => {
      dispatch(emitSelectSpot(socket, location, token))
    },
    setWatchId: (watchId) => {
      dispatch(setWatchId(watchId))
    }
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    facebookJson: reduxState.facebookJson,
    socket: reduxState.socket,
    spots: reduxState.spots,
  }
}

export default compose(
  connect(
    mapDispatchToProps,
    mapReduxStateToProps
  ),
  withLocation,
  withHandlers({ 
    handleOnPress: props => e => {
      const { socket, facebookJson } = props
      const token = facebookJson.id
      const location = e.nativeEvent.coordinate
      props.emitSelectSpot(socket, location, token)
      const watchId = props.watchLocationAsync()
      props.setWatchId(watchId)
      props.handleGetDirections(e)
      e.persist()
    }
  }),
  lifecycle({
    componentWillUnmount() {
      console.log("MarkerList will unmount")
      if (this.props.data.watchId) {
        this.props.data.watchId.remove()
      }
    }
  })
)(MarkerList) 

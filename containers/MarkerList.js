import React from 'react'
import MarkerList from '../components/MarkerList'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { emitSelectSpot } from '../actions/socket'
import { setWatchId } from '../actions/data'
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
    user: reduxState.user,
    socket: reduxState.socket,
    data: reduxState.data,
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
      const { socket, user } = props
      const token = user.facebookJson.id
      const { socketInstance } = socket
      const location = e.nativeEvent.coordinate
      props.emitSelectSpot(socketInstance, location, token)
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

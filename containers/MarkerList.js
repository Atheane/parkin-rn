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
      const watchId = props.watchLocationAsync()
      props.setWatchId(watchId)
      props.handleGetDirections(e)
      e.persist()
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      console.log("In componentWillReceiveProps")
      console.log("this.props.spots",this.props.spots)

      if (nextProps.spots !== this.props.spots) {
        console.log("nextProps.spots", nextProps.spots)
        console.log("this.props.spots",this.props.spots)
      }
    },
    componentWillUnmount() {
      console.log("MarkerList will unmount")
      if (this.props.watchId) {
        this.props.watchId.remove()
      }
    }
  }),
)(MarkerList) 

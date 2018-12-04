import React from 'react'
import Map from '../components/Map'
import { NavigationActions } from 'react-navigation'
import { Permissions } from 'expo'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setPosition } from '../actions/data'
import { emitUserPosition } from '../actions/socket'
import withLocation from '../HOC/withLocation'

const mapDispatchToProps = (dispatch) => {
  return {
    setPosition: (location) => {
      dispatch(setPosition(location))
    },
    emitUserPosition: (socket, location, token) => {
      dispatch(emitUserPosition(socket, location, token))
    },
    navigateToLocationAuth: () => {
      dispatch(NavigationActions.navigate({routeName: 'LocationAuth'}))
    }
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    socket: reduxState.socket.socketInstance,
    token: reduxState.user.facebookJson.id,
    userPosition: reduxState.data.userPosition
  }
}

export default compose(
  connect(
    mapReduxStateToProps,
    mapDispatchToProps
  ),
  withLocation,
  lifecycle({
    componentDidMount() {
      const { socket, token } = this.props
      this.props.getLocationAsync().then((location) => {
        if (location !== undefined) {
          this.props.setPosition(location)
          this.props.emitUserPosition(socket, location, token)
        } else {
          this.props.navigateToLocationAuth()
          Permissions.askAsync(Permissions.LOCATION)
        }
      }).catch(error => console.log("getLocationAsync", error))
    },
  })
)(Map)


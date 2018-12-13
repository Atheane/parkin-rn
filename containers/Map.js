import React from 'react'
import Map from '../components/Map'
import { NavigationActions } from 'react-navigation'
import { Permissions } from 'expo'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setPosition, emitUserPosition } from '../actions'
import withLocation from '../HOC/withLocation'

const mapDispatchToProps = (dispatch) => {
  return {
    setPosition: (location) => {
      dispatch(setPosition(location))
    },
    emitUserPosition: (socket, location, token) => {
      dispatch(emitUserPosition(socket, location, token))
    },
    navigateToSettings: () => {
      dispatch(NavigationActions.navigate({routeName: 'Settings'}))
    }
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    socket: reduxState.socket,
    facebookJson: reduxState.facebookJson,
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
      const { socket, facebookJson } = this.props
      const token = facebookJson.id
      this.props.getLocationAsync().then((location) => {
        this.props.setPosition(location)
        this.props.emitUserPosition(socket, location, token)
      }).catch((error) => {
        console.log("getLocationAsync in containers/Map.js", error)
        this.props.navigateToSettings()
      })
    }
  })
)(React.memo(Map))


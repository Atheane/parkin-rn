import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { NavigationActions } from 'react-navigation'

import { setUserData, logUser } from '../actions/user'
import { emitUserData } from '../actions/socket'
import withAsyncStorage from '../HOC/withAsyncStorage'
import withFacebookAuth from '../HOC/withFacebookAuth'
import SignScreen from '../components/SignScreen'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (facebookJson, emptyAsyncStorage) => {
      dispatch(setUserData(facebookJson))
      dispatch(logUser(emptyAsyncStorage))
    },
    emitUserData: (socket, facebookJson) => {
      dispatch(emitUserData(socket, facebookJson))
    },
    navigateToAuth: () => {
      dispatch(NavigationActions.navigate({routeName: 'Auth'}))
    },
    navigateToApp: () => {
      dispatch(NavigationActions.navigate({routeName: 'Main'}))
    },  
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    socket: reduxState.socket,
  }
}

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  withAsyncStorage,
  withFacebookAuth,
  withHandlers({ 
    handleOnPress: props => event => {
      debugger
      const facebookJson = props.getUserDataFromFacebook('ParkinFacebookJson')
      const emptyResponse = (facebookJson === null)
      if (emptyResponse) {
        props.navigateToAuth()
      } else {
        props.saveToStorage('ParkinFacebookJson', facebookJson)
        props.setUser(facebookJson, true)
        props.emitUserData(props.socket, facebookJson)
        props.navigateToApp()
      }
    }
  }),
  lifecycle({
    componentWillUnmount() {
      console.log("Component SignSCreen.js unmounting")
    }
  })
)(SignScreen)
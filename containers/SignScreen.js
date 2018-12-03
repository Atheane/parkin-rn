import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { setUserData, logUser } from '../actions/user'
import { emitUserData } from '../actions/socket'
import withAsyncStorage from '../HOC/withAsyncStorage'
import withFacebookAuth from '../HOC/withFacebookAuth'
import SignScreen from '../components/SignScreen'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (facebookJson, firstConnection) => {
      dispatch(setUserData(facebookJson))
      dispatch(logUser(firstConnection))
    },
    emitUserData: (socket, facebookJson) => {
      dispatch(emitUserData(socket, facebookJson))
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
      const facebookJson = props.getUserDataFromFacebook('ParkinFacebookJson')
      const emptyAsyncStorage = (facebookJson === null)
      if (!emptyAsyncStorage) {
        props.setUser(facebookJson, emptyAsyncStorage)
        props.emitUserData(props.socket, facebookJson)
        props.navigation.navigate('App')
      } else {
        props.saveToStorage('ParkinFacebookJson', facebookJson)
        props.navigation.navigate('Auth')
      }
    }
  }),
  lifecycle({
    componentWillUnmount() {
      console.log("Component SignSCreen.js unmounting")
    }
  })
)(SignScreen)
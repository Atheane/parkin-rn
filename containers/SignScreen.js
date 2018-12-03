import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { AsyncStorage } from 'react-native'

import { setUserData, logUser } from '../actions/user'
import { emitUserData } from '../actions/socket'
import withFacebookAuth from '../HOC/withFacebookAuth';
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
    user: reduxState.user,
    socket: reduxState.socket,
  }
}

const setUserToStorage = async (facebookJson) => {
  console.log("In withAsyncStorage")
  console.log("In setUserToStorage", facebookJson)
  try {
    await AsyncStorage.setItem('ParkinUserInfo', JSON.stringify(facebookJson))
  } catch (error) {
    console.log({errorMessage: error, component: "withAsyncStorage.js" })
  }
}

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  withFacebookAuth,
  lifecycle({
    UNSAFE_componentWillReceiveProps(nextProps) {  //to-do replace with getDerivedStateFromProps
      const { socket, user } = this.props
      console.log("SignScreen, componentWillReceiveProps, user:", user)
      console.log("SignScreen, componentWillReceiveProps, nextProps.user:", nextProps.user)

      if (nextProps.user !== user) {
        const firstConnection = (user === null)

        if (firstConnection) {
          setUserToStorage(nextProps.user.facebookJson)
          this.props.setUser(nextProps.user.facebookJson, firstConnection)
          this.props.emitUserData(socket, nextProps.user.facebookJson)
          this.props.navigation.navigate('App')
        } else {
          this.props.navigation.navigate('Auth')
        }
      }
    }
  }),
  withHandlers({ 
    handleOnPress: props => event => {
      props.getUserFromFacebook()
    }
  })
)(SignScreen)
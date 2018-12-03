import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'
import { AsyncStorage } from 'react-native'

import { setUser, logUser } from '../actions/user'
import { emitUser } from '../actions/socket'
import withFacebookAuth from '../HOC/withFacebookAuth';
import SignScreen from '../components/SignScreen'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user, isUserLogged) => {
      dispatch(setUser(user))
      dispatch(logUser(isUserLogged))
    },
    emitUserInfo: (socket, user) => {
      dispatch(emitUser(socket, user))
    },
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    user: reduxState.user,
    socket: reduxState.socket,
    nav: reduxState.nav
  }
}

const setUserToStorage = async (user) => {
  console.log("In withAsyncStorage")
  console.log("In setUserToStorage", user)
  try {
    await AsyncStorage.setItem('ParkinUserInfo', JSON.stringify(user))
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
  withHandlers({ 
    handleOnPress: props => event => {
      props.getUserFromFacebook()
    }
  }),
  lifecycle({
    componentDidMount() {
      const { socket, user } = this.props
      const isUserLogged = !(user === null)
      if (isUserLogged) {
        setUserToStorage(user)
        this.props.setUser(user, isUserLogged)
        this.props.emitUser(socket, user)
        this.props.navigation.navigate('App')
      } else {
        this.props.navigation.navigate('Auth')
      }
    },
    componentWillUnmount() {
      console.log("Component AuthLoadingScreen.js unmounting")
      // Can't perform a React state update on an unmounted componen.
      // To fix this cancel all subscriptions and asynchronous tasks in the componentWillUnmount method
    }
  })
)(SignScreen)
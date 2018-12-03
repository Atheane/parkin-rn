import React from 'react'
import AuthLoadingScreen from '../components/AuthLoadingScreen'
import withAsyncStorage from '../HOC/withAsyncStorage'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setUser, logUser } from '../actions/user'
import { emitUser } from '../actions/socket'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo, isUserLogged) => {
      dispatch(setUser(userInfo))
      dispatch(logUser(isUserLogged))
    },
    emitUser: (socket, userInfo) => {
      dispatch(emitUser(socket, userInfo))
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

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  withAsyncStorage,  
  lifecycle({
    componentDidMount() {
      const { socket, user } = this.props
      const isUserLogged = !(user === null)
      if (isUserLogged) {
        this.props.setUser(user, isUserLogged)
        this.props.emitUser(socket, user)
        this.props.navigation.navigate('App')
      } else {
        this.props.navigation.navigate('Auth')
      }
    },
    componentWillUnmount() {
      console.log("Component AuthLoadingScreen.js unmounting")
    }
  })
)(AuthLoadingScreen)
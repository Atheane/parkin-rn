import React from 'react'
import AuthLoadingScreen from '../components/AuthLoadingScreen'
import withAsyncStorage from '../HOC/withAsyncStorage'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setUserData, logUser } from '../actions/user'
import { emitUserData } from '../actions/socket'

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

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  withAsyncStorage,  
  lifecycle({
    componentDidMount() {
      const { socket, user } = this.props
      
      const firstConnection = (user === null)
      if (!firstConnection) {
        this.props.setUser(user.facebookJson, firstConnection)
        this.props.emitUserData(socket, user.facebookJson)
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
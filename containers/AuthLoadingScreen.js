import React from 'react'
import AuthLoadingScreen from '../components/AuthLoadingScreen'
import withAsyncStorage from '../HOC/withAsyncStorage'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setUserInfo, logUser, emitUserInfo} from '../actions/app'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo, isUserLogged) => {
      dispatch(setUserInfo(userInfo))
      dispatch(logUser(isUserLogged))
    },
    emitUserInfo: (socket, userInfo) => {
      dispatch(emitUserInfo(socket, userInfo))
    },
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    userInfo: reduxState.userInfo
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
      const { socket, userInfo } = this.props
      const isUserLogged = (userInfo)
      this.props.setUser(userInfo, isUserLogged)
      this.props.emitUserInfo(socket, userInfo)
      this.props.navigation.navigate(isUserLogged ? 'App' : 'Auth')
    },
  })
)(AuthLoadingScreen)
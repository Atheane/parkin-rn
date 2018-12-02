import React from 'react'
import AuthLoadingScreen from '../components/AuthLoadingScreen'
import withAuth from '../HOC/withAuth'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setUser } from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => {
      dispatch(setUser(userInfo))
    },
    emitUser: (socket, userInfo) => {
      dispatch(emitUser(socket, userInfo))
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
  withAuth,
  lifecycle({
    componentDidMount() {
      const { socket, userInfo } = this.props
      this.props.setUser(userInfo)
      this.props.emitUser(socket, userInfo)
    },
  })
)(AuthLoadingScreen)
import React from 'react'
import AuthLoadingScreen from '../components/AuthLoadingScreen'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setUser } from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    emitUser: (socket, user) => {
      dispatch(emitUser(socket, user))
    },
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    user: reduxState.user
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
      const { socket, user } = this.props
      this.props.setUser(user)
      this.props.emitUser(socket, user)
    },
  })
)(AuthLoadingScreen)
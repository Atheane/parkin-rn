import React from 'react'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers, branch } from 'recompose'
import { setUser } from '../actions'
import { getUserFromStorage } from '../utils/localStorageManager'
import { getUserFromFacebook } from '../utils/authFacebook'


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
  branch(                              // flow: if userInfo not in AsyncStorage, render Login component
    () => !(getUserFromStorage()),
    withHandlers({                    // In Login component, if press on SignIn, auth with Facebook connect  
      handlePressAsync: props => {    // and store data in AsyncStorage
        getUserFromFacebook()
      },
    })(Login)
  ),
  lifecycle({
    componentDidMount() {
      const { socket } = this.props
      const user = getUserFromStorage()
      this.props.setUser(user)
      this.props.emitUser(socket, user)
    },
  })
)(Login)

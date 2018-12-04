import React from 'react'

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { NavigationActions } from 'react-navigation'

import AuthLoadingScreen from '../components/AuthLoadingScreen'
import withAsyncStorage from '../HOC/withAsyncStorage'

import { setUserData, logUser, emitUserData } from '../actions'

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
    navigateToMain: () => {
      dispatch(NavigationActions.navigate({routeName: 'Main'}))
    },    
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    socket: reduxState.socket
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
      const { socket } = this.props
      this.props.loadFromStorage('ParkinFacebookJson').then(
        facebookJson => {
          const emptyAsyncStorage = (facebookJson === null)
          if (emptyAsyncStorage) {
            this.props.navigateToAuth()
          } else {
            this.props.setUser(facebookJson, emptyAsyncStorage)
            this.props.emitUserData(socket, facebookJson)
            // this.props.navigation.navigate('Home')
            this.props.navigateToMain()
          }
        } 
      ).catch(error => console.log(error))

    },
    componentWillUnmount() {
      console.log("Component AuthLoadingScreen.js unmounting")
    }
  })
)(AuthLoadingScreen)
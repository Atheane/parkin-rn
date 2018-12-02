import React, { Component } from 'react'
import Loading from '../components/SimpleLoadingScreen'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        userInfo: null
      }
    }

    getUserFromStorage = async () => {
      const unparsedUserInfo = await AsyncStorage.getItem('ParkinUserInfo')
      const userInfo = JSON.parse(unparsedUserInfo)
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userInfo ? 'App' : 'Auth')
      this.setState({ userInfo }, () => console.log("userInfo in withAuth state"))
    }

    render() {
      return (
        <WrappedComponent {...this.props} {...this.state} />
      )
    }
  }
}


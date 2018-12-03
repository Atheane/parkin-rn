import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        userInfo: null,
      }
      this.getUserFromStorage()
    }

    getUserFromStorage = async () => {
      const unparsedUserInfo = await AsyncStorage.getItem('ParkinUserInfo')
      const userInfo = JSON.parse(unparsedUserInfo)
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.setState({ userInfo }, () => console.log("userInfo in withAsyncStorage state"))
    }

    render() {
      return (
        <WrappedComponent {...this.props} {...this.state} />
      )
    }
  }
}


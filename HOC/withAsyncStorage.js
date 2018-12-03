import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        facebookJson: null,
      }
      this.getUserFromStorage()
    }

    getUserFromStorage = async () => {
      const unparsedUserInfo = await AsyncStorage.getItem('ParkinUserInfo')
      const facebookJson = JSON.parse(unparsedUserInfo)
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.setState({ facebookJson }, () => console.log("facebookJson in withAsyncStorage state"))
    }

    render() {
      return (
        <WrappedComponent {...this.props} {...this.state} />
      )
    }
  }
}


import React, { Component } from 'react'
import * as Expo from 'expo'
import Loading from '../components/SimpleLoadingScreen'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        fontLoaded: false
      }
    }

    async componentDidMount() {
      console.log("importFont.js did mount")
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
      this.setState({fontLoaded: true})
    }

    render() {
      const { fontLoaded } = this.state
      console.log("importFont", fontLoaded)
      if (fontLoaded) {
        return (
          <WrappedComponent {...this.props} />
        )
      } else {
        return (
          <Loading />
        )
      }
    }
  }
}


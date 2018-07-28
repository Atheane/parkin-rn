import React, { Component } from 'react'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        fontLoaded: false
      }
    }

    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
      this.setState({fontLoaded: true})
    }

    render() {
      const { fontLoaded } = this.state
      return (
        <WrappedComponent {...this.state} {...this.props} />
      )
    }
  }
}
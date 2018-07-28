import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import { socket } from '../utils/sockets'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        userPosition: null,
        spots: []
      }
    }

    componentDidMount() {
      this.getLocationAsync()
      socket.on("spotsAroundMe", (spots) => {
        console.log("listening on spotsAroundMe")
        console.log(spots)
        this.setState({spots})
      })
    }

    getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        });
      }
  
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
      const userPosition = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...deltas
      };
      console.log("Get Current Position", userPosition)
      await this.setState({ userPosition })
      await socket.emit("userPosition", userPosition)
    }

    render () {
      return (
        <WrappedComponent {...this.state} />
      )
    }
  }
}
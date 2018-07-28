import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import { socket } from '../utils/sockets'
import getDirections from 'react-native-google-maps-directions'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export const getSpots = (WrappedComponent) => {
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

export const handleGetDirections = (e) => {
  console.log("handleGetDirections", {
    latitude: e.nativeEvent.coordinate.latitude,
    longitude: e.nativeEvent.coordinate.longitude
  })
  const data = {
    destination: {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    params: [
      {
        key: "travelmode",
        value: "driving"        // may be "walking", "bicycling" or "transit" as well
      },
      {
        key: "dir_action",
        value: "navigate"       // this instantly initializes navigation using the given travel mode 
      }
    ]
  }
  
  getDirections(data)
}
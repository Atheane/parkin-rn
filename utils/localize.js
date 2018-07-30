import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import getDirections from 'react-native-google-maps-directions'

import { 
  onSpotsAroundMe, 
  emitInitialUserPosition, 
  emitMovingUserPosition,
  onSpotNearMe 
} from '../utils/sockets'

const deltas = {
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221
}

export const getSpots = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        initialUserPosition: null,
        spots: [],
        status: null,
        errorMessage: null,
      }
    }

    componentDidMount() {
      this.getLocationAsync()
      onSpotsAroundMe((spots) => {
        console.log(spots)
        this.setState({spots})
      })
      onSpotNearMe((message) => {
        console.log(message)
      })
    }

    getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      console.log("getLocationAsync", status)
      this.setState({ status })
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
        console.log(this.state.errorMessage)
      } else {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
        const initialUserPosition = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          ...deltas
        }
        console.log("get current Position", initialUserPosition)
        await this.setState({ initialUserPosition })
        await emitInitialUserPosition(initialUserPosition)
      }
    }

    watchPositionAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      console.log("watchLocationAsync", status)
      this.setState({ status })
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
        console.log(this.state.errorMessage)
      } else {
        const options = {
          enableHighAccuracy: true,
          distanceInterval: 1,
        }
        const callback = (location) => {
          const userPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            ...deltas
          }
          console.log("Watch User Position", userPosition)
          emitMovingUserPosition(userPosition)
          console.log("accuracy", location.coords.accuracy)
          console.log("speed", location.coords.speed)
          console.log("timestamp", location.timestamp)
        }
        Location.watchPositionAsync(options, callback)
      }
    }

    componentWillUnmount() {
      this.watchId.remove()
    }

    render() {
      return (
        <WrappedComponent {...this.state} watchPositionAsync={this.watchPositionAsync}/>
      )
    }
  }
}

export const handleGetDirections = (e) => {
  console.log("handleGetDirections")
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
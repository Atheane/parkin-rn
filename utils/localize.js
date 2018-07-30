import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import { onSpotsAroundMe, emitUserPosition, onSpotNearMe } from '../utils/sockets'
import getDirections from 'react-native-google-maps-directions'

const deltas = {
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221
}

export const getSpots = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        userPosition: null,
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
      onSpotNearMe((spot) => {
        console.log(spot)
      })
      // this.watchId = this.watchPositionAsync()
    }

    getLocationAsync = async () => {
      console.log("getLocationAsync")
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      this.setState({ status })
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
        console.log(this.state.errorMessage)
      } else {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
        const userPosition = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          ...deltas
        }
        console.log("Get Current Position", userPosition)
        await this.setState({ userPosition })
        await emitUserPosition(userPosition)
      }
    }

    // watchPositionAsync = async () => {
    //   console.log("watchLocationAsync")
    //   // const { status } = this.state

    //   let { status } = await Permissions.askAsync(Permissions.LOCATION)
    //   this.setState({ status })
    //   if (status !== 'granted') {
    //     this.setState({
    //       errorMessage: 'Permission to access location was denied'
    //     })
    //     console.log(this.state.errorMessage)
    //   } else {
    //     const options = {
    //       enableHighAccuracy: true,
    //       distanceInterval: 1,
    //     }
    //     const callback = (location) => {
    //       const userPosition = {
    //         latitude: location.coords.latitude,
    //         longitude: location.coords.longitude,
    //         ...deltas
    //       }
    //       this.setState({userPosition})
    //       emitUserPosition(userPosition)
    //       console.log("coordonnees", [location.coords.longitude, location.coords.latitude])
    //       console.log("accuracy", location.coords.accuracy)
    //       console.log("speed", location.coords.speed)
    //       console.log("timestamp", location.timestamp)
    //     }
    //     Location.watchPositionAsync(options, callback)
    //   }
    // }

    // componentWillUnmount() {
    //   this.watchId.remove()
    // }

    render() {
      return (
        <WrappedComponent {...this.state} />
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
import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import getDirections from 'react-native-google-maps-directions'

import { 
  onSpotsAroundMe, 
  emitMovingUserPosition,
  emitInitialUserPosition,
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
        watchId: undefined,
        userInfo2: this.props.userInfo
      }
    }

    componentDidMount() {
      console.log("localize is mounted")
      this.getLocationAsync()
      onSpotsAroundMe((spots) => {
        console.log(spots)
        this.setState({spots})
      })
    }

    getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      // console.log("getLocationAsync", status)
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
        this.setState({ initialUserPosition })
        const { userInfo } = this.props
        if (initialUserPosition && userInfo) {
          emitInitialUserPosition({userPosition: initialUserPosition, token: userInfo.id})
        }
      }
    }

    watchPositionAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      // console.log("watchLocationAsync", status)
      this.setState({ status })
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
        console.log(this.state.errorMessage)
      } else {
        const options = {
          enableHighAccuracy: true,
          distanceInterval: 10,
        }
        const callback = (location) => {
          const userPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            ...deltas
          }
          if (userPosition && this.state.userInfo2) {
            emitMovingUserPosition({ userPosition, token: this.state.userInfo2.id })
          }
        }
        this.state.watchId = await Location.watchPositionAsync(options, callback)
      }
    }

    componentWillUnmount() {
      console.log("localize will unmount")
      if (this.props.watchId) {
        this.props.watchId.remove()
      } else {
        console.log({
          errorMessage: "Trying to remove watchId, but watchId undefined",
          component: "localize.js"
        })
      }
    }

    render() {
      // console.log("in render localize, this.state.initialUserPosition", this.state.initialUserPosition)
      // console.log("in render localize, this.props.userInfo", this.props.userInfo)

      return (
        <WrappedComponent {...this.state} {...this.props} watchPositionAsync={this.watchPositionAsync} getLocationAsync={this.getLocationAsync}/>
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
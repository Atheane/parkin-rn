import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import getDirections from 'react-native-google-maps-directions'

import { 
  onSpotsAroundMe, 
  emitMovingUserPosition,
  emitCurrentUserPosition,
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
        currentUserPosition: null,
        spots: [],
        status: null,
        errorMessage: null,
        watchId: undefined,
      }
    }

    componentDidMount() {
      console.log("getSpots is mounted")
      this.getLocationAsync()
      onSpotsAroundMe((spots) => {
        console.log(spots)
        this.setState({spots}, () => console.log('setState spots in getSpots'))
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
        const currentUserPosition = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          ...deltas
        }
        console.log(">>>>>>>>>>>>>>>>> In localize.js")
        console.log("In getSpots, getLocationAsync, get current Position", currentUserPosition)
        this.setState({ currentUserPosition }, () => console.log('setState currentUserPosition in getSpots'))
        const { userInfo } = this.props
        if (currentUserPosition && userInfo) {
          emitCurrentUserPosition({userPosition: currentUserPosition, token: userInfo.id})
        }
      }
    }

    watchLocationAsync = async () => {
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
          if (userPosition && this.props.userInfo) {
            emitMovingUserPosition({ userPosition, token: this.props.userInfo.id })
          }
        }
        this.setState({ watchId:  await Location.watchPositionAsync(options, callback)})
      }
    }

    componentWillUnmount() {
      console.log("localize will unmount")
      if (this.state.watchId) {
        this.state.watchId.remove()
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
        <WrappedComponent {...this.state} {...this.props} watchLocationAsync={this.watchLocationAsync} />
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
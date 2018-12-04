import React from 'react'
import { Permissions, Location } from 'expo'
import getDirections from 'react-native-google-maps-directions'

export default (WrappedComponent) => {
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221
      }
    } else {
      console.log('Permission to access location was denied')
    }
  }

  const watchLocationAsync = async (token) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
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
      }
      const watchId = await Location.watchPositionAsync(options, callback)
      return watchId
    }
  }

  const handleGetDirections = (e) => {
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
  
  return (props) => (
    <WrappedComponent
      getLocationAsync={getLocationAsync}
      watchLocationAsync={watchLocationAsync}
      handleGetDirections={handleGetDirections}
      {...props}
    />
  )
}


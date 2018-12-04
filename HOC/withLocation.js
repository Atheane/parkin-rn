import React from 'react'
import { Permissions, Location } from 'expo'

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
    } 
  }
  
  return (props) => (
    <WrappedComponent
      getLocationAsync={getLocationAsync}
      {...props}
    />
  )
}


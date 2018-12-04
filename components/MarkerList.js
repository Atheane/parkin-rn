import React from 'react'
import { MapView } from 'expo'

const Marker = MapView.Marker

export default (props) => {
  const { spots, handleOnPress } = props
  if (spots && spots.length > 0) {
    return spots.map((spot, i) => (
      <Marker 
        key={i}
        title={spot.name}
        coordinate={spot.spot.coords}
        image={(spot.selected) ? require('../assets/selectedSpot.png') : require('../assets/spot.png')}
        onPress={handleOnPress}
      />
    ))
  } else {
    console.log({errorMessage: "no spots", component: "MarkerList"})
    return null
  }
}


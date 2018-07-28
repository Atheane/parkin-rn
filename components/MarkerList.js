import React from 'react'
import { MapView } from 'expo'

const Marker = MapView.Marker

export default (props) => {
  const { spots, handleOnPress } = props
  return spots.map((spot, i) => (
    <Marker 
      key={i}
      title={spot.name}
      coordinate={spot.coords}
      image={ require('../assets/parking128.png') }
      onPress={handleOnPress}
    />
  ))
}
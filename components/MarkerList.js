import React from 'react'
import { MapView } from 'expo'

const Marker = MapView.Marker

export default (props) => {
  const { spots, handleOnPress } = props
  return spots.map((spotObj, i) => (
    <Marker 
      key={i}
      title={spotObj.spot.name}
      coordinate={spotObj.spot.coords}
      image={(spotObj.selected) ? require('../assets/selectedSpot.png') : require('../assets/spot.png')}
      onPress={handleOnPress}
    />
  ))
}
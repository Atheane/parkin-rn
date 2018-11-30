import React from 'react'
import { MapView } from 'expo'

const Marker = MapView.Marker

export default (props) => {
  const { spots, handleOnPress } = props
  console.log('>>>>>>>>>>>>>>>> In MarkerList.js')
  console.log('spots')
  console.log(spots)
  // debugger
  if (spots && spots.constructor === Array) {
    return spots.map((spotObj, i) => (
      <Marker 
        key={i}
        title={(spotObj.spot && spotObj.spot.name) ? spotObj.spot.name : '' }
        coordinate={(spotObj.spot && spotObj.spot.coords) ? spotObj.spot.coords : {
            latitude: 48.886,
            longitude: 2.322
          }
        }
        image={(spotObj.selected) ? require('../assets/selectedSpot.png') : require('../assets/spot.png')}
        onPress={handleOnPress}
      />
    ))
  } else {
    console.log({errorMessage: "no spots", component: "MarkerList"})
    return null
  }
}
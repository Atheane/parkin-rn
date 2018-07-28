import React from 'react'
import { MapView } from 'expo'

import { unactivateSpot } from '../utils/sockets'
import { handleGetDirections } from '../utils/localize'

const Marker = MapView.Marker

export default (props) => {
  const { places } = props
  return places.map((place, i) => (
    <Marker 
      key={i}
      title={place.name}
      coordinate={place.coords}
      image={ require('../assets/parking128.png') }
      onPress={(e) => {
          unactivateSpot(e)
          handleGetDirections(e)
        }
      }
    />
  ))
}
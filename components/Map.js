import React from 'react'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import NightStyle from '../constants/NightStyle'
import MarkerList from '../containers/MarkerList'

export default (props) => {
  const { userPosition, spots } = props
  return (
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={NightStyle}
        style={styles.container}
        region={userPosition}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        minZoomLevel={15}
        loadingEnabled
      >
        <MarkerList spots={spots}/>
      </MapView>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  size: {
    width: 32,
    height: 32,
  }
}
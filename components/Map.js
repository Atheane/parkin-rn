import React from 'react'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import NightStyle from './NightStyle'
import MarkerList from './components/MarkerList'

const Map = (props) => {
  const { region, places } = props
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={NightStyle}
      style={styles.container}
      region={region}
      showsUserLocation
      showsMyLocationButton
      showsTraffic
      minZoomLevel={15}
      loadingEnabled
    >
      <MarkerList places={places} />
    </MapView>
  )
}

export default Map;

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
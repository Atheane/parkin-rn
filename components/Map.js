import React, { Component } from 'react'
import { Platform } from 'react-native'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import NightStyle from './NightStyle'

const Marker = MapView.Marker

export default class Map extends Component {
  renderMarkers() {
    if (this.props.places) {
      return this.props.places.map((place, i) => (
        <Marker 
          key={i}
          title={place.name}
          coordinate={place.coords}
          image={ require('../assets/parking128.png') }
        />
      ))
    }
  }
 
  render() {
    const { region } = this.props
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={NightStyle}
        style={styles.container}
        region={region}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        minZoomLevel={14}
        loadingEnabled
      >
        {this.renderMarkers()}
      </MapView>
    )
  }
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
import React, { Component } from 'react'
import { Platform } from 'react-native'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import getDirections from 'react-native-google-maps-directions'
import NightStyle from './NightStyle'

const Marker = MapView.Marker

export default class Map extends Component {
  
  handleGetDirections = (e) => {
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

  renderMarkers() {
    if (this.props.places) {
      return this.props.places.map((place, i) => (
        <Marker 
          key={i}
          title={place.name}
          coordinate={place.coords}
          image={ require('../assets/parking128.png') }
          onPress={(position) => this.handleGetDirections(position)}
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
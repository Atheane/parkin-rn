import React from 'react'
import { MapView, Svg } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { View, TouchableHighlight, Image } from 'react-native'
import NightStyle from '../constants/NightStyle'
import MarkerList from '../containers/MarkerList'


export default (props) => {
  const { userPosition, spots } = props
  return (
      <View>
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
        {/* <TouchableHighlight onPress={console.log('Should give a spot')}>
          <Image
            style={styles.button}
            source={require('../assets/map-marker-2.svg')}
          />
        </TouchableHighlight> */}
        <Svg style={styles.button}>
          <Svg.Circle
            cx={50}
            cy={50}
            r={45}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#f1c40f"
          />
        </Svg>
      </View>
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
  },
  button: {
    position: 'absolute',
    width: 50, 
    height: 50, 
    bottom: 80, 
    right: 80, 
    zIndex: 1,
    backgroundColor: "#f79933"
  }
}
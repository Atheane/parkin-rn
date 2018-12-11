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
          showsTraffic
          minZoomLevel={15}
          loadingEnabled
        >
          <MarkerList spots={spots}/>
        </MapView>
        <TouchableHighlight onPress={console.log('Should give a spot')} style={styles.button}>
          <Svg height="100" width="100" fill="none" style={styles.svg} >
            <Svg.Defs>
              <Svg.LinearGradient
                id="grad"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2="50"
            >          
                <Svg.Stop offset="0" stopColor="red" stopOpacity="0" />
                <Svg.Stop offset="1" stopColor="blue" stopOpacity="1" />
              </Svg.LinearGradient>
            </Svg.Defs>
            <Svg.Circle
              cx="30"
              cy="30"
              r="27"
              strokeWidth={2}
              stroke="rgb(255,255,255)"
              fill="url(#grad)"
            />
          </Svg>
        </TouchableHighlight>
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
    width: 70, 
    height: 70, 
    bottom: 30, 
    right: 30,
    zIndex: 1,
    // backgroundColor: "transparent"
  },
  svg: {
    position: 'relative',
    bottom: 0, 
    right: 0, 
    zIndex: 2
  }
}
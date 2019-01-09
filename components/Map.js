import React from 'react'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { View } from 'react-native'
import NightStyle from '../constants/NightStyle'
import MarkerList from '../containers/MarkerList'
import SpotButton from '../containers/SpotButton.js'

let nbRender = 0

export default (props) => {
  const { userPosition, spots } = props
  console.log("Render position : ", nbRender)
  nbRender+=1
  console.log("userPosition : ", userPosition)

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
        <SpotButton />
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
}
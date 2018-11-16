import React, { Component } from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
import ArrivalModal from './ArrivalModal'
import { Permissions, Location } from 'expo'
import { compose, withState, withProps } from 'recompose'
import { onSpotsAroundMe} from '../utils/sockets'
import logProps from '../utils/logProps'


const Search = (props) => {

  const { screenProps, navigation } = props
  console.log('>>>>>>>>>>>>>>>>>>>>')
  console.log(screenProps.spots)
  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <ArrivalModal {...screenProps} {...navigation} />
        <Map {...screenProps} />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <ArrivalModal {...screenProps} {...navigation} />
        <Map {...screenProps} />
      </View>
    )
  }
  return ( display )
}

const getLocationAsync = async (userInfo) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)
  const deltas = {
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0221
  }
  // console.log("getLocationAsync", status)
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
  } else {
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    const currentUserPosition = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    }
    console.log("get current Position", currentUserPosition)
    if (currentUserPosition && userInfo) {
      emitUserPosition({ userPosition: currentUserPosition, token: userInfo.id })
      return currentUserPosition
    }
  }
}


const enhance = compose(
  withState('currentUserPosition', 'locateUser', ({ userInfo }) => getLocationAsync(userInfo)),
  logProps,
  withProps(({screenProps}) => {
    let { spots } = screenProps
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(spots)
    onSpotsAroundMe((sps) => spots = sps)
    console.log(spots)
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    return {
      screenProps: {
        spots
      }
    }
  })
)

export default enhance(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
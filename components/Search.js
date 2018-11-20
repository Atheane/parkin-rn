import React, { Component } from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
import ArrivalModal from './ArrivalModal'
import { compose, withHandlers, lifecycle, withState } from 'recompose'
import { emitSelectSpot } from '../utils/sockets'
import { getSpots, handleGetDirections } from '../utils/localize'

const SearchUI = (props) => {
  const { screenProps, navigation, currentUserPosition, spots } = props
  console.log(">>>>>>>>>>>>>>>>> In Search.js, SearchUI")
  console.log("spots", spots)
  console.log("currentUserPosition", currentUserPosition)

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

// const testUI = () => (
//   <View style={styles.container}>
//     <Text> HELLO </Text>
//   </View>
// );


// const getLocationAsync = async (userInfo) => {
//   let { status } = await Permissions.askAsync(Permissions.LOCATION)
//   const deltas = {
//     latitudeDelta: 0.0522,
//     longitudeDelta: 0.0221
//   }
//   // console.log("getLocationAsync", status)
//   if (status !== 'granted') {
//     console.log('Permission to access location was denied')
//   } else {
//     let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
//     const currentUserPosition = {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       ...deltas
//     }
//     console.log("get user current position", currentUserPosition)
//     if (currentUserPosition && userInfo) {
//       emitCurrentUserPosition({ userPosition: currentUserPosition, token: userInfo.id })
//       return currentUserPosition
//     }
//   }
// }

// const currentUserPosition = {
//   latitude: 48.9373878,
//   longitude: 2.1792915,
//   latitudeDelta: 0.0522,
//   longitudeDelta: 0.0221
// }

// const enhance = compose(
//   withState('currentUserPosition', 'locateUser', props => getLocationAsync(props.userInfo)),
//   withProps(({screenProps}) => {    
//     return {
//       screenProps: {
//         spots: onSpotsAroundMe((sps) => sps)
//       }
//     }
//   })
// )
console.log('In Search.js')

const enhance = compose(
  getSpots,
  withHandlers({ 
    handleOnPress: props => e => {
      // props.registerForPushNotifications()
      if (props.userInfo) {
        emitSelectSpot({
          coord: e.nativeEvent.coordinate,
          token: props.userInfo.id
        })
      }
      e.persist()
      props.watchLocationAsync()
      handleGetDirections(e)
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>> componentWillReceiveProps')
      console.log('nextProps.currentUserPosition', nextProps.currentUserPosition)
      // console.log('nextProps.spots', nextProps.spots)
      if (nextProps.currentUserPosition !== this.props.currentUserPosition || 
        nextProps.spots !== this.props.spots) {
        this.setState({ 
          currentUserPosition:  nextProps.currentUserPosition,
          spots: nextProps.spots
        });
      }
    }
  })
)

const Search = enhance(SearchUI)

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
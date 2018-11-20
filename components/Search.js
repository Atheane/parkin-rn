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

const Search = (props) => {
  const { screenProps, navigation, currentUserPosition, spots } = props
  console.log(">>>>>>>>>>>>>>>>> In Search.js, SearchUI")
  console.log("spots", spots)
  console.log("currentUserPosition", currentUserPosition)

  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <ArrivalModal {...screenProps} {...navigation} />
        <Map {...screenProps}
        currentUserPosition={currentUserPosition}
        spots={spots} />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <ArrivalModal {...screenProps} {...navigation} />
        <Map {...screenProps} 
           currentUserPosition={currentUserPosition}
           spots={spots} />
      </View>
    )
  }
  return ( display )
}

export default compose(
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
      console.log('nextProps.spots', nextProps.spots)
      if (nextProps.currentUserPosition !== this.props.currentUserPosition || 
        nextProps.spots !== this.props.spots) {
        this.setState({ 
          currentUserPosition:  nextProps.currentUserPosition,
          spots: nextProps.spots
        });
      }
    }
  })
)(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
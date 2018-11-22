import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
import ArrivalModal from './ArrivalModal'
import { compose, withHandlers, lifecycle } from 'recompose'
import { emitSelectSpot } from '../utils/sockets'
import { getSpots, handleGetDirections } from '../utils/localize'

const Search = (props) => {
  const { screenProps, navigation, currentUserPosition, spots, handleOnPress } = props
  // console.log(">>>>>>>>>>>>>>>>> In Search.js, SearchUI")
  // console.log("spots", spots)
  // console.log("currentUserPosition", currentUserPosition)

  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <ArrivalModal {...screenProps} {...navigation} />
        <Map {...screenProps}
        currentUserPosition={currentUserPosition}
        spots={spots} 
        handleOnPress={handleOnPress}
        />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <ArrivalModal {...screenProps} {...navigation} />
        <Map {...screenProps} 
           currentUserPosition={currentUserPosition}
           spots={spots}
           handleOnPress={handleOnPress}
           />
      </View>
    )
  }
  return ( display )
}

export default compose(
  getSpots,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>> componentWillReceiveProps')
      // console.log('nextProps.currentUserPosition', nextProps.currentUserPosition)
      // console.log('nextProps.spots', nextProps.spots)
      if (nextProps.currentUserPosition !== this.props.currentUserPosition || 
        nextProps.spots !== this.props.spots) {
        this.setState({ 
          currentUserPosition:  nextProps.currentUserPosition,
          spots: nextProps.spots
        });
      }
    }
  }),
  withHandlers({ 
    handleOnPress: props => e => {
      // props.registerForPushNotifications()
      // console.log('ZZZZZZZZZZZZZZZZ in handleOnPress, props', props)
      if (props.screenProps.userInfo) {
        emitSelectSpot({
          coord: e.nativeEvent.coordinate,
          token: props.screenProps.userInfo.id
        })
      }
      e.persist()
      props.watchLocationAsync()
      handleGetDirections(e)
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
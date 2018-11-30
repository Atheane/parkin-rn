import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
// import { compose, withHandlers, lifecycle } from 'recompose'
// import { emitSelectSpot } from '../utils/sockets'
// import { getSpots, handleGetDirections } from '../utils/localize'

const Search = (props) => {
  const { screenProps, currentUserPosition } = props
  // console.log(">>>>>>>>>>>>>>>>> In Search.js, SearchUI")
  // console.log("spots", spots)
  // console.log("currentUserPosition", currentUserPosition)

  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <Map {...screenProps}
        currentUserPosition={currentUserPosition}
        />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <Map {...screenProps} 
           currentUserPosition={currentUserPosition}
           />
      </View>
    )
  }
  return ( display )
}

export default React.memo(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

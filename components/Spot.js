import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'

export default ({ screenProps }) => {
  let display
  if (Platform.OS === 'ios') {
    display = (
        <SafeAreaView style={styles.container}>
          <Map {...screenProps} />
        </SafeAreaView>
    )
  } else {
    display = (
        <View style={styles.container}>
          <Map {...screenProps} />
        </View>
    )
  }
  return ( display )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

// try {
//   socket.emit("giveSpot", {token: props.screenProps.userInfo.id, coord: props.screenProps.initialUserPosition})
// } catch (error) {
//   console.log("clic bouton give spot", error)
// }
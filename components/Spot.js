import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'

export default (props) => {
  let display
  if (Platform.OS === 'ios') {
    display = (
        <SafeAreaView style={styles.container}>
          <Map {...props} />
        </SafeAreaView>
    )
  } else {
    display = (
        <View style={styles.container}>
          <Map {...props} />
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
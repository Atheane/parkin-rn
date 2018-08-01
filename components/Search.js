import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
import ArrivalModal from './ArrivalModal'

export default (props) => {
  let display
  if (Platform.OS === 'ios') {
    display = (
        <SafeAreaView style={styles.container}>
          <ArrivalModal {...props} />
          <Map {...props} />
        </SafeAreaView>
    )
  } else {
    display = (
        <View style={styles.container}>
          <ArrivalModal {...props} />
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
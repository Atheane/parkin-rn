import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
import ArrivalModal from './ArrivalModal'

export default ({ screenProps }) => {
  // console.log(props)
  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <ArrivalModal {...screenProps} />
        <Map {...screenProps} />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <ArrivalModal {...screenProps} />
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
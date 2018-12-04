import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from '../containers/Map'

const Search = (props) => {
  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <Map />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <Map />
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
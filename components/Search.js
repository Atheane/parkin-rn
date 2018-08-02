import React, { Component } from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './Map'
import ArrivalModal from './ArrivalModal'

export default class extends Component {


  render() {
    const { screenProps, navigation } = this.props
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
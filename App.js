import React, { Component } from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from './components/Map'
import Layout from './components/Layout'
import localize from './HOC/localize'
import importFont from './HOC/importFont'
import { compose } from 'recompose'

class AppContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { userPosition, spots, fontLoaded } = this.props
    // console.log("spots", spots)
    console.log("fontLoaded", fontLoaded)

    let display
    if (Platform.OS === 'ios') {
      display = (
          <SafeAreaView style={styles.container}>
            <Map
              region={userPosition}
              places={spots}
            />
         </SafeAreaView>
      )
    } else {
      display = (
          <View style={styles.container}>
            <Map
              region={userPosition}
              places={spots}
            />
          </View>
      )
    } 
    if (fontLoaded) {
      display = (
        <Layout>
          {display}
        </Layout>
      )
    }
    return ( display )
  }
}

const enhance = compose(
  localize,
  importFont,
)

export default enhance(AppContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import { compose } from 'recompose'
import Map from './components/Map'
import Layout from './components/Layout'
import { getSpots } from './utils/localize'
import importFont from './utils/importFont'

const App = (props) => {
  const { userPosition, spots, fontLoaded } = props
  // console.log("spots", spots)
  console.log("spots", spots)

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

const enhance = compose(
  getSpots,
  importFont,
)

export default enhance(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

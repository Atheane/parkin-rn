import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import { compose, withHandlers } from 'recompose'
import Map from './components/Map'
import Layout from './components/Layout'
import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import { emitUnactivateSpot } from './utils/sockets'
import notify from './utils/notify'

const App = (props) => {
  const { fontLoaded } = props
  // console.log("Props in App:", props)
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
  notify,
  withHandlers({ 
    handleOnPress: props => e => {
      emitUnactivateSpot(e)
      handleGetDirections(e)
      props.registerForPushNotifications()
    }
  })
)

export default enhance(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import { compose, withHandlers, withProps } from 'recompose'

import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { emitSelectSpot } from './utils/sockets'

import Map from './components/Map'
import Layout from './components/Layout'
import ArrivalModal from './components/ArrivalModal'


const AppContainer = (props) => {
  const { fontLoaded } = props
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
      props.registerForPushNotifications()
      emitSelectSpot(e)
      e.persist()
      props.watchPositionAsync()
      handleGetDirections(e)
    }
  }),
)

const App = enhance(AppContainer)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

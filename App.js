import React, { Component } from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  AsyncStorage
} from 'react-native'
import { compose, withHandlers, withProps } from 'recompose'

import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { emitSelectSpot } from './utils/sockets'
import login from './utils/login'

import Map from './components/Map'
import Layout from './components/Layout'
import ArrivalModal from './components/ArrivalModal'


class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false
    }
  }
  render() {
    const { fontLoaded, userInfo } = this.props
    console.log("In App", userInfo)

    let display
    if (Platform.OS === 'ios') {
      display = (
          <SafeAreaView style={styles.container}>
            <ArrivalModal {...this.props} />
            <Map {...this.props} />
          </SafeAreaView>
      )
    } else {
      display = (
          <View style={styles.container}>
            <ArrivalModal {...this.props} />
            <Map {...this.props} />
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
  login
)

const App = enhance(AppContainer)

// AsyncStorage.clear()


export default App



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

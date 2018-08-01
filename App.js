import React from 'react'
import { AsyncStorage } from 'react-native'
import { Container, Header } from 'native-base'
import { compose, withHandlers, withProps } from 'recompose'
import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { emitSelectSpot } from './utils/sockets'
import login from './utils/login'
import FooterNavigator from './components/FooterNavigator'
import Search from './components/Search'

const AppContainer = (props) => {
  console.log("In AppContainer################", props.userInfo)
  return (
    <Container>
      <Header />
      <FooterNavigator screenProps={{...props}} />
    </Container>
  )
}

const enhance = compose(
  importFont,
  getSpots,
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
  login,
)

const App = enhance(AppContainer)

// AsyncStorage.clear()

export default App


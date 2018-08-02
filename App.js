import React, { Component } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import { compose, withHandlers, withProps } from 'recompose'
import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { 
  emitUserInfo, 
  emitInitialUserPosition,
  emitSelectSpot
} from './utils/sockets'
// import { Login } from './components/Login'
import login from './utils/login'
import FooterNavigator from './components/FooterNavigator'
import { Container, Header } from 'native-base'

let counter = 0
const AppContainer = (props) => {
  console.log("in render Appcontainer, props.initialUserPosition", props.initialUserPosition)
  console.log("in render Appcontainer, props.userInfo", props.userInfo)
  const userPosition = props.initialUserPosition
  const userInfo = props.userInfo

  if (userPosition && userInfo && counter === 0) {
    counter += 1
    emitInitialUserPosition({userPosition, token: userInfo.id})
  }
  return (
    <Container>
      <Header />
      <FooterNavigator screenProps={{...props}} />
    </Container>
  )
}

const enhance = compose(
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
  login,
  getSpots,
)

const App = enhance(AppContainer)

export default App


// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
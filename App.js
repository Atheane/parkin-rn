import React from 'react'
import { compose, withHandlers } from 'recompose'
import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { 
  emitInitialUserPosition,
  emitSelectSpot
} from './utils/sockets'
// import { Login } from './components/Login'
import login from './utils/login'
import FooterNavigator from './components/FooterNavigator'
import { Container, Header } from 'native-base'

const AppContainer = (props) => {

  return (
    <Container>
      <Header />
      <FooterNavigator screenProps={{...props}} />
    </Container>
  )
}

const enhance = compose(
  importFont,
  login,
  // notify,
  getSpots,
  withHandlers({ 
    handleOnPress: props => e => {
      // props.registerForPushNotifications()
      if (props.userInfo) {
        emitSelectSpot({
          coord: e.nativeEvent.coordinate,
          token: props.userInfo.id
        })
      }
      e.persist()
      props.watchPositionAsync()
      handleGetDirections(e)
    }
  }),
)

const App = enhance(AppContainer)

export default App


// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
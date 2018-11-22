import React from 'react'
import { compose, withHandlers } from 'recompose'
import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { 
  emitSelectSpot
} from './utils/sockets'
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

export default compose(
  importFont,
  login,
  // notify,
)(AppContainer)

// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
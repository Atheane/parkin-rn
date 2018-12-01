import React from 'react'
import { compose } from 'recompose'
import importFont from './utils/importFont'
import login from './utils/login'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { MainStack } from './components/FooterNavigator'
import ArrivalModal from './components/ArrivalModal'
import { Container, Header } from 'native-base'
import { Provider as StoreProvider } from 'react-redux'
import { createStore, applyMiddleware, compose as reduxCompose } from 'redux'
import reduxPromise from 'redux-promise'
import reducers from './reducers'
import setupSocket from './sockets'

// composing redux middleWares in React Native
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

// reduxStore
const store = createStore(
  reducers, 
  {}, 
  composeEnhancers(
    applyMiddleware(reduxPromise)
  )
)

const socket = setupSocket(store.dispatch)

export default compose(
  importFont,                   // to-do : StoreProvider at the very root, with all the data in the store, fontLoaded, erros, all of them
  () => login(socket),
  // notify,
)(
  (props) => {
    return (
        <StoreProvider store={store}>
          <Container>
            <Header />
            <Root screenProps={{...props}} socket={socket} />
          </Container>
        </StoreProvider>
    )
  }
)



// Root Navigation
const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Modal: {
      screen: ArrivalModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const Root = createAppContainer(RootStack)



// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
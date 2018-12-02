import React from 'react'
import { compose, renderComponent } from 'recompose'
import importFont from './utils/importFont'
import login from './utils/login'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { MainStack } from './components/FooterNavigator'
import ArrivalModal from './components/ArrivalModal'
import { Container, Header } from 'native-base'
import { Provider as StoreProvider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import reduxPromise from 'redux-promise'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import appReducers from './reducers'
import setupSocket from './sockets'


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

// const Root = createAppContainer(RootStack)

const navReducer = createNavigationReducer(RootStack);

const reducers = combineReducers({
  app: appReducers,
  nav: navReducer
})

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

export default () => {
  return (
    <StoreProvider store={store} socket={socket}>
      <AppContainer socket={socket} />
    </StoreProvider>
  )
}

const AppContainer = compose(
  importFont,                   
  login, 
  // notify,
)(
  (props) => {
    return (
      <Container>
        <Header />
        <Root {...props} />
      </Container>
    )
  }
)






// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
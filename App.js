import React from 'react'
import { Text } from 'react-native'
import { compose } from 'recompose'
import importFont from './HOC/importFont'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { Provider as StoreProvider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import reduxPromise from 'redux-promise'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'

import appReducer from './reducers/appReducer'
import socketReducer from './reducers/socketReducer'

import setupSocket from './sockets'

import AuthLoadingScreen from './containers/AuthLoadingScreen'
import HomeScreen from './components/HomeScreen'
import ArrivalModal from './components/ArrivalModal'
import SignScreen from './components/SignScreen'

import logProps from './HOC/logProps'

const AppNavigator = createSwitchNavigator( 
  {
    AuthLoading: AuthLoadingScreen,
    Auth: createStackNavigator({ Sign: SignScreen }),
    App: createStackNavigator(
      { 
        Home: HomeScreen,
        Modal: ArrivalModal,
      },
      {
        mode: 'modal',
        headerMode: 'none',
      }
    ),
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

const navReducer = createNavigationReducer(AppNavigator)

const reducers = combineReducers({
  app: appReducer,
  socket: socketReducer,
  nav: navReducer,
})

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",                   // unique store id, useful if several store, must be consistent with reduxifyNavogator
  state => state.nav,
)

const mapStateToProps = (state) => ({
  state: state.nav,
})

const App = reduxifyNavigator(AppNavigator, "root")

const AppWithNavigationState = compose(
  connect(mapStateToProps),
  importFont,                   
)(App)

// const AppWithNavigationState = connect(mapStateToProps)(App)

// composing redux middleWares in React Native
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

const INITIAL_STATE = {
  app: {},
  socket: {},
  nav: null,
}

// reduxStore
const store = createStore(
  reducers, 
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(reduxPromise, navigationMiddleware)
  )
)

const socket = setupSocket(store.dispatch) // we pass dispatch to

export default () => {
  return (
    <StoreProvider store={store} >
      <AppWithNavigationState socket={socket}/>   
    </StoreProvider>
  )
}

// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
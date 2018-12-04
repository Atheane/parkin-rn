import React from 'react'
import { compose } from 'recompose'
import importFont from './HOC/importFont'
import { createStackNavigator } from 'react-navigation'
import { Provider as StoreProvider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import reduxPromise from 'redux-promise'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'

import socket from './reducers/socket'
import emptyAsyncStorage from './reducers/emptyAsyncStorage'
import facebookJson from './reducers/facebookJson'
import userPosition from './reducers/userPosition'
import spots from './reducers/spots'
import watchId from './reducers/watchId'
import arrivalSpot from './reducers/arrivalSpot.js'

import setupSocket from './sockets'
import { INITIAL_STATE } from './constants/InitialReduxState'

import AuthLoadingScreen from './containers/AuthLoadingScreen'
import SignScreen from './containers/SignScreen'
import { ModalScreen } from './components/ModalScreen'
import LocationAuthScreen from './components/LocationAuthScreen'
import { FooterNavigator } from './components/FooterNavigator'

import logProps from './HOC/logProps'


const AppNavigator = createStackNavigator( 
  {
    AuthLoading: AuthLoadingScreen,
    Auth: SignScreen,
    Main: createStackNavigator(
      { 
        Home: FooterNavigator,  //careful, not HomeScreen, https://reactnavigation.org/docs/en/common-mistakes.html
        Modal: ModalScreen,
        LocationAuth: LocationAuthScreen
      },
      {
        mode: 'modal',
        headerMode: 'none',
      }
    ),
  },
  {
    initialRouteName: 'AuthLoading',
    mode: 'modal',
    headerMode: 'none',
  }
)

const navReducer = createNavigationReducer(AppNavigator)

const reducers = combineReducers({
  socket,
  emptyAsyncStorage,
  facebookJson,
  userPosition,
  spots,
  watchId,
  arrivalSpot,
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

// reduxStore
const store = createStore(
  reducers, 
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(reduxPromise, navigationMiddleware)
  )
)

export const socketInstance = setupSocket(store.dispatch)

export default () => {
  return (
    <StoreProvider store={store} >
      <AppWithNavigationState />   
    </StoreProvider>
  )
}

// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
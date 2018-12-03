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

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import socketReducer from './reducers/socketReducer'

import setupSocket from './sockets'

import AuthLoadingScreen from './containers/AuthLoadingScreen'
import HomeScreen from './components/HomeScreen'
import ArrivalModal from './components/ArrivalModal'
import SignScreen from './containers/SignScreen'
import { FooterNavigator } from './components/FooterNavigator'

import logProps from './HOC/logProps'

const MainNavigator = createStackNavigator(
  { 
    Home: FooterNavigator,  //caereful, not HomeScreen, https://reactnavigation.org/docs/en/common-mistakes.html
    Modal: ArrivalModal,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const AppNavigator = createStackNavigator( 
  {
    AuthLoading: AuthLoadingScreen,
    Auth: SignScreen,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
    mode: 'modal',
    headerMode: 'none',
  }
)

const navReducer = createNavigationReducer(AppNavigator)

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
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
  user: null,
  data: null,
  socket: null,
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

setupSocket(store.dispatch)

export default () => {
  return (
    <StoreProvider store={store} >
      <AppWithNavigationState />   
    </StoreProvider>
  )
}

// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
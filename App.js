import React from 'react'
import { compose } from 'recompose'
import importFont from './utils/importFont'
import login from './utils/login'
import { createStackNavigator } from 'react-navigation'
import { MainStack } from './components/FooterNavigator'
import ArrivalModal from './components/ArrivalModal'
import Login from './components/Login'
import { Container, Header } from 'native-base'
import { Provider as StoreProvider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import reduxPromise from 'redux-promise'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import appReducers from './reducers'
import setupSocket from './sockets'
import logProps from './utils/logProps'

// Root Navigation
const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Modal: {
      screen: ArrivalModal,
    },
    Login: {
      screen: LoginPage
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

// const Root = createAppContainer(RootStack)

const navReducer = createNavigationReducer(AppNavigator)

const reducers = combineReducers({
  app: appReducers,
  nav: navReducer
})

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
)

const mapStateToProps = (state) => ({
  state: state.nav,
})

const App = reduxifyNavigator(AppNavigator, "root")

const AppWithNavigationState = compose(
  importFont,                   
  login,
  connect(mapStateToProps),
  logProps,
)(App)

// composing redux middleWares in React Native
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

const INITIAL_STATE = {
  app: {
    socketId: '',
    userInfo: {},
    userPosition: {},
    spots: [],
    userEmitted: true
  },
  nav: null
}

// reduxStore
const store = createStore(
  reducers, 
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(reduxPromise, navigationMiddleware)
  )
)

const socket = setupSocket(store.dispatch)

export default class extends React.Component {
  render() {
    return (
      <StoreProvider store={store} socket={socket}>
        <Container>
          <Header />
          <AppWithNavigationState socket={socket} />
        </Container>
      </StoreProvider>
    );
  }
}

// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
import React from 'react'
import { compose } from 'recompose'
import importFont from './utils/importFont'
import notify from './utils/notify'
import login from './utils/login'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { MainStack } from './components/FooterNavigator'
import ArrivalModal from './components/ArrivalModal'
import { Container, Header } from 'native-base'
import { Provider as StoreProvider } from 'react-redux'
import { createStore, combineReducers , applyMiddleware, compose as reduxCompose } from 'redux'
import reduxPromise from 'redux-promise'
import positionReducer from './reducers/positionReducer'
import spotsReducer from './reducers/spotsReducer'

export default compose(
  importFont,
  login,
  // notify,
)(
  (props) => {
    return (
        <StoreProvider store={createStore(
            reducers, 
            {}, 
            composeEnhancers(
              applyMiddleware(reduxPromise)
            )
          )}>
          <Container>
            <Header />
            <Root screenProps={{...props}} />
          </Container>
        </StoreProvider>
    )
  }
)

const reducers = combineReducers({
  spots: spotsReducer,
  // selectedSpot: selectedSpotReducer,
  currentUserPosition: positionReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

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
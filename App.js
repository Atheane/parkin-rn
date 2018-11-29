import React from 'react'
import { compose } from 'recompose'
import importFont from './utils/importFont'
import notify from './utils/notify'
import login from './utils/login'
import FooterNavigator from './components/FooterNavigator'
import { Container, Header } from 'native-base'
import { Provider as StoreProvider } from 'react-redux'
import { createStore, combineReducers , applyMiddleware } from 'redux'
import logger from 'redux-logger'
import positionReducer from './reducers/positionReducer'
import spotsReducer from './reducers/spotsReducer'



const reducers = combineReducers({
  spots: spotsReducer,
  // selectedSpot: selectedSpotReducer,
  currentUserPosition: positionReducer
})

const middleWares = applyMiddleware(logger)

export default compose(
  importFont,
  login,
  // notify,
)(
  (props) => {
    return (
        <StoreProvider store={createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
          <Container>
            <Header />
            <FooterNavigator screenProps={{...props}} />
          </Container>
        </StoreProvider>
    )
  }
);

// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
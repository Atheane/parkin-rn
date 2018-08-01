import React, { Component } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import { compose, withHandlers, withProps } from 'recompose'
import { getSpots, handleGetDirections } from './utils/localize'
import importFont from './utils/importFont'
import notify from './utils/notify'
import { 
  emitUserInfo, 
  emitInitialUserPosition, 
  emitSelectSpot
} from './utils/sockets'
import Login from './components/Login'
import FooterNavigator from './components/FooterNavigator'
import { Container, Header } from 'native-base'


class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null,
    }
  }

  componentDidMount() {
    console.log("in AppContainer", this.props)
    this._retrieveData()
  }

  componentDidUpdate(prevProps) {
    console.log("AppCOntainer Did update",prevProps)
    let userPosition = this.props.initialUserPosition
    let token = this.state.userInfo.id

    if (userPosition!==prevProps.initialUserPosition) {
      emitInitialUserPosition({
        userPosition, 
        token
      })
    }
  }

  _retrieveData = async () => {
    console.log("In _retrieveData")
    try {
      const unparsedUserInfo = await AsyncStorage.getItem('ParkinUserInfo')
      const userInfo = await JSON.parse(unparsedUserInfo)
      await emitUserInfo(userInfo)

      if (userInfo !== null) {
        this.setState({ userInfo })
        console.log("in App Container", userInfo)
      } else {
        console.log({errorMessage: "userInfo null in Async Storage", component: "Login.js" })
      }
     } catch (error) {
      console.log({errorMessage: error, component: "AppContainer" })
     }
  }

  _getUserInfo = (userInfo) => {
    this.setState({userInfo})
  }

  render () {
    const {userInfo} = this.state
    if (userInfo) {
      return (
        <Container>
          <Header />
          <FooterNavigator screenProps={{...this.props, ...this.state}} />
        </Container>
      )
    } else {
      return ( <Login _getUserInfo={this._getUserInfo}/>)
    }

  }
}

const enhance = compose(
  importFont,
  getSpots,
  notify,
  withHandlers({ 
    handleOnPress: props => e => {
      props.registerForPushNotifications()
      emitSelectSpot({coord: e.nativeEvent.coordinate, token: props.userInfo.id})
      e.persist()
      props.watchPositionAsync()
      handleGetDirections(e)
    }
  })
)

const App = enhance(AppContainer)

export default App


// to-do: proper logout with https://github.com/react-navigation/react-navigation/issues/1979
// solution de jeserodz
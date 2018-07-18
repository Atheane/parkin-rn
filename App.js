import React, { Component } from 'react'
import { 
  StyleSheet, Platform, SafeAreaView, View 
} from 'react-native'
import { Location, Permissions } from 'expo'
import Map from './components/Map'
import Layout from './components/Layout'
import socketIOClient from 'socket.io-client'

// window.navigator.userAgent = "react-native"

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default class App extends Component {
  state = {
    userPosition: null,
    spots: [],
    fontLoaded: false,
    response: false,
    endpoint: "http://fda981dc.ngrok.io"
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  componentDidMount() {
    this.getLocationAsync()
    const { endpoint, userPosition } = this.state
    const socket = socketIOClient(endpoint, {transports: ['websocket']})
    // socket.on("FromAPI", data => console.log(data))
    socket.on('connect', () => {
      console.log("socket connected")
      //to-do comment updater la position au moment où elle est acquise et arrive dans le state
      //pour le moment elle vaut undefined (parce que le composant est monté 
      //avant que l'on arrive à récupérer la postion du user)
      console.log("userPosition", userPosition)
      socket.emit("userPosition", userPosition )
      socket.on("spotsAroundMe", data => {
        console.log(data)
        this.setState({spots: data})
      })
    })

    socket.on('connect_error', (err) => {
      console.log(err)
    })

    socket.on('disconnect', () => {
      console.log("Disconnected Socket!")
    })

  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    const userPosition = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    console.log("Get Current Position", userPosition)
    await this.setState({ userPosition });
  }

  render() {
    const { userPosition, spots, fontLoaded } = this.state
    let display
    if (Platform.OS === 'ios') {
      display = (
          <SafeAreaView style={styles.container}>
            <Map
              region={userPosition}
              places={spots}
            />
         </SafeAreaView>
      )
    } else {
      display = (
          <View style={styles.container}>
            <Map
              region={userPosition}
              places={spots}
            />
          </View>
      )
    } 
    if (fontLoaded) {
      display = (
        <Layout>
          {display}
        </Layout>
      )
    }
    return ( display )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

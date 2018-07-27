import React, { Component } from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import { Permissions, Location } from 'expo'
import Map from './components/Map'
import Layout from './components/Layout'
import { socket } from './utils/sockets'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPosition: null,
      spots: [],
      fontLoaded: false
    }
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
    const { userPosition } = this.state
    // socket.on("FromAPI", data => console.log(data)
    socket.on("spotsAroundMe", (spots) => {
      console.log("listening on spotsAroundMe")
      console.log(spots)
      this.setState({spots})
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
    await socket.emit("userPosition", userPosition)
  }

  render() {
    const { userPosition, spots, fontLoaded } = this.state
    console.log("spots", spots)
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

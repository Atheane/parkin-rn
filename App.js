import React, { Component } from 'react'
import { 
  StyleSheet, Platform, SafeAreaView, View 
} from 'react-native'
import { Location, Permissions } from 'expo'
import Map from './components/Map'
import Layout from './components/Layout'
import markers from './constants/testData'


const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default class App extends Component {
  state = {
    region: null,
    spots: markers,
    fontLoaded: false,
  }

  componentDidMount() {
    this.getLocationAsync()
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({})
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  }

  render() {
    const { region, spots, fontLoaded } = this.state
    let display
    if (Platform.OS === 'ios') {
      display = (
          <SafeAreaView style={styles.container}>
            <Map
              region={region}
              places={spots}
            />
         </SafeAreaView>
      )
    } else {
      display = (
          <View style={styles.container}>
            <Map
              region={region}
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

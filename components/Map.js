import React, { Component } from 'react'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import getDirections from 'react-native-google-maps-directions'
import NightStyle from './NightStyle'
import { socket } from '../utils/sockets'
import { Permissions, Notifications } from 'expo'

const Marker = MapView.Marker

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      notification: null,
      title: 'Hello World',
      body: 'Say something!',
    };
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (status !== 'granted') {
        return
      }
    }
    const token = await Notifications.getExpoPushTokenAsync()
    console.log(token)
    this.subscription = Notifications.addListener(this.handleNotification)
    this.setState({
      token,
    });
    this.sendPushNotification()
  }

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    console.log("should send notification")
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  handleNotification = notification => {
    this.setState({
      notification,
    })
  }

  unactivateSpot = (e) => {
      console.log("unactivateSpot");
      socket.emit("unactivateSpot", e.nativeEvent.coordinate);
  }
  
  handleGetDirections = (e) => {
    const data = {
      destination: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }
    
    getDirections(data)
  }

  renderMarkers() {
    if (this.props.places) {
      return this.props.places.map((place, i) => (
        <Marker 
          key={i}
          title={place.name}
          coordinate={place.coords}
          image={ require('../assets/parking128.png') }
          onPress={(point) => {
              this.unactivateSpot(point)
              this.registerForPushNotifications()
              this.handleGetDirections(point)
            }
          }
        />
      ))
    }
  }
 
  render() {
    const { region } = this.props
    console.log(this.state.notification)
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={NightStyle}
        style={styles.container}
        region={region}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        minZoomLevel={14}
        loadingEnabled
      >
        {this.renderMarkers()}
      </MapView>
    )
  }
}
const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  size: {
    width: 32,
    height: 32,
  }
}
import React, { Component } from 'react'
import { Permissions, Location } from 'expo'
import { socket } from '../utils/sockets'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        token: null,
        notification: null,
        title: 'Hello World',
        body: 'Say something!',
      }
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

    render () {
      return (
        <WrappedComponent {...this.state} handleNotification={this.handleNotification} sendPushNotification={this.sendPushNotification} />
      )
    }
  }
}
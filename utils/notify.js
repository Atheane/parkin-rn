import React, { Component } from 'react'
import { Permissions, Notifications } from 'expo'
import { emitTokenPushNotification } from './sockets'

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

    registerForPushNotifications = async () => {
      console.log("in registerForPushNotifications")
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

      if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        if (status !== 'granted') {
          return
        }
      }
      let token = await Notifications.getExpoPushTokenAsync()
      console.log(token)
      console.log(Date.now())
      this.subscription = Notifications.addListener(this.handleNotification)
      await this.setState({ token })
      // await emitTokenPushNotification(token)
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
        <WrappedComponent 
          {...this.state} 
          {...this.props} 
          handleNotification={this.handleNotification} 
          registerForPushNotifications={this.registerForPushNotifications}
        />
      )
    }
  }
}
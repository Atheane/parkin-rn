import React, { Component } from 'react'
import { Permissions, Notifications } from 'expo'
import { emitTokenPushNotification } from '../utils/sockets'


// THIS COMPONENT IS NOT USED YET

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        pushToken: null,
        notification: null,
      }
    }
    componentDidMount() {
      console.log("notify is mounted")
    }

    registerForPushNotifications = async () => {
      console.log("registerForPushNotifications is called")
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }
    
      // Get the token that uniquely identifies this device
      let pushToken = await Notifications.getExpoPushTokenAsync();

      const userInfo = this.props.userInfo
      console.log("In registerForPushNotifications render : pushToken", pushToken)
      console.log("In registerForPushNotifications render : userInfo", userInfo)

      if (userInfo && pushToken) {
        await emitTokenPushNotification({pushToken, token: userInfo.id})
      }
      this.subscription = Notifications.addListener(this.handleNotification)
      this.setState({ pushToken })

    }

    handleNotification = notification => {
      this.setState({
        notification,
      })
    }

    componentWillUnmount() {
      console.log("notify will unmount")
    }   

    render() {
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
import React from 'react'
import { createBottomTabNavigator, TabNavigator } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base'
import Search from './Search'
import Spot from './Spot'
import Chat from './Chat'
import Profile from './Profile'
import {socket, onSpotsAroundMe} from '../utils/sockets'


export default (TabNavigator(
  {
    Search: { screen: Search },
    Spot: { screen: Spot },
    Profile: { screen: Profile },
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => {
                props.navigation.navigate("Search")
                try {
                  onSpotsAroundMe((spots) => {
                    console.log(spots)
                    props.screenProps.spots = spots
                  })
                } catch (error) {
                  console.log("clic bouton geo", error)
                }

              }
              }>
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => {
                  props.navigation.navigate("Spot")
                  try {
                    socket.emit("giveSpot", {token: props.screenProps.userInfo.id, coord: props.screenProps.initialUserPosition})
                  } catch (error) {
                    console.log("clic bouton give spot", error)
                  }
                }
              }>
              <Icon type="FontAwesome" name="street-view" />
              <Text>Spot</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Profile")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
))
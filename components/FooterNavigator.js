import React from 'react'
import {  TabNavigator } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import Search from './Search'
import Spot from './Spot'
// import Chat from './Chat'
import Profile from './Profile'

export default (TabNavigator(
  {
    Search: { screen: Search },
    Spot: { screen: Spot },
    Profile: { screen: Profile },
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: ({navigation, navigationState}) => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={navigationState.index === 0}
              onPress={() => {
                navigation.navigate("Search")
              }
              }>
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
            <Button
              vertical
              active={navigationState.index === 1}
              onPress={() => {
                  navigation.navigate("Spot")
                }
              }>
              <Icon type="FontAwesome" name="street-view" />
              <Text>Spot</Text>
            </Button>
            <Button
              vertical
              active={navigationState.index === 2}
              onPress={() => navigation.navigate("Profile")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
))
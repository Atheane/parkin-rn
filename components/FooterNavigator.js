import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base'
import Search from './Search'
import Spot from './Spot'
import Chat from './Chat'
import Profile from './Profile'

export default TabNavigator(
  {
    Search: { screen: Search },
    Spot: { screen: Spot },
    Chat: { screen: Chat },
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
              onPress={() => props.navigation.navigate("Search")}>
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Spot")}>
              <Icon type="FontAwesome" name="street-view" />
              <Text>Spot</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Chat")}>
              <Icon name="chatbubbles" />
              <Text>Chat</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("Profile")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
)
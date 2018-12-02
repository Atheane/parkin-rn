import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import Search from './Search'
import Profile from '../screens/ProfileScreen'


export const FooterNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ focused }) =>  <AntDesign size={20} name="search1" color={ focused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}/>,
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) =>  <AntDesign size={20} name="home" color={ focused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}/>,
      }
    },
  },
  {
    initialRouteName: 'Search',
    tabBarOptions: {
      activeTintColor:'rgb(252, 155, 25)',
      inactiveTintColor: 'rgb(138, 145, 187)',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingTop: '3%',
      },
    }
  },
)


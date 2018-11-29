import React from 'react'
// import { View, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
// import { Ionicons } from '@expo/vector-icons'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

import Search from './Search'
import Spot from './Spot'
// import Chat from './Chat'
import Profile from './Profile'


const NavStack = createBottomTabNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ focused }) =>  <AntDesign size={20} name="search1" color={ focused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}/>,
      }
    },
    Spot: {
      screen: Spot,
      navigationOptions: {
        tabBarIcon: ({ focused }) =>  <Entypo size={20} name="location" color={ focused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}/>,
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
  //   tabBarComponent: ({ navigation }) => {
  //     return (
  //         <Footer>
  //           <FooterTab>
              
  //             <Button
  //                 active={navigation.isFocused}
  //                 vertical
  //                 color={ navigation.isFocused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}
  //                 onPress={() => navigation.navigate("Spot")}
  //               >
  //               <Entypo size={20} name="location" />
  //               <Text> Spot </Text>
  //             </Button>
  //             <Button
  //                 active={navigation.isFocused}
  //                 vertical
  //                 color={ navigation.isFocused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}
  //                 onPress={() => navigation.navigate("Profile")}
  //               >
  //               <AntDesign size={20} name="home" />
  //               <Text> Profil </Text>
  //             </Button>
  //           </FooterTab>
  //         </Footer>
  //     )
  // }

    },
)

export default createAppContainer(NavStack)

// tabBarComponent: ({ navigation }) => {
//   return (
//     <Button
//     active={navigation.isFocused}
//     vertical
//     color={navigation.isFocused ? 'rgb(252, 155, 25)' : 'rgb(138, 145, 187)'}
//     onPress={() => navigation.navigate("Search")}
//   >
//     <AntDesign size={20} name="search1" />
//     <Text> Se Garer </Text>
//   </Button>
//   )
// }

// export default (createBottomTabNavigator(
//   {
//     Search: { screen: Search },
//     Spot: { screen: Spot },
//     Profile: { screen: Profile },
//   },
//   {
//     tabBarComponent: ({navigation, navigationState}) => {
//       return (
//         <Footer>
//           <FooterTab>
//             <Button
//               vertical
//               active={navigationState.index === 0}
//               onPress={() => {
//                 navigation.navigate("Search")
//               }
//               }>
//               <Icon name="search" />
//               <Text>Search</Text>
//             </Button>
//             <Button
//               vertical
//               active={navigationState.index === 1}
//               onPress={() => {
//                   navigation.navigate("Spot")
//                 }
//               }>
//               <Icon type="FontAwesome" name="street-view" />
//               <Text>Spot</Text>
//             </Button>
//             <Button
//               vertical
//               active={navigationState.index === 2}
//               onPress={() => navigation.navigate("Profile")}>
//               <Icon name="person" />
//               <Text>Profile</Text>
//             </Button>
//           </FooterTab>
//         </Footer>
//       )
//     }
//   }
// ))
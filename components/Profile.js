import React from 'react'
import { View, Image, Text } from 'react-native'
import Loading from './Loading'


export default ({screenProps}) => {
  const userInfo = JSON.parse(screenProps.userInfo)
  if (userInfo) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: userInfo.picture.data.url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20 }}>{userInfo.name}</Text>
        <Text>ID: {userInfo.id}</Text>
      </View>
    )
  } else {
    return <Loading />
  }
}

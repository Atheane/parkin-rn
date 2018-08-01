import React from 'react'
import { View, Image, Text } from 'react-native'
import Loading from './Loading'


export default (props) => {
  if (props.userInfo) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: props.userInfo.picture.data.url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20 }}>{props.userInfo.name}</Text>
        <Text>ID: {props.userInfo.id}</Text>
      </View>
    )
  } else {
    return <Loading />
  }
}

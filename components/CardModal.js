import React, { Component } from 'react'
import { Image } from 'react-native'
import { 
  Container, 
  View, 
  DeckSwiper, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Left, 
  Body, 
  Icon, 
  Button
} from 'native-base'
import { socket } from '../utils/sockets'

export default class extends Component {

  cards = () => {
    return [
      {
        text: this.props.message.title,
        name: this.props.message.body,
        imageThumbnail: require('../assets/spot.png'),
        imageBig: require('../assets/ParkingSpot.jpg'),
      }
    ]
  }

  _deleteSpot = () => {
    const { navigate, message, userInfo, _toggleModal } = this.props
    console.log("in card modal message", message)
    console.log("in card modal userInfo", userInfo)

    _toggleModal()
    
    if (message && message.coord && userInfo && userInfo.id) {
      const coord = message.coord
      const token = userInfo.id
      socket.emit("deleteSpot", {coord, token})
      navigate('Search')
    }
  }

  _thanksSpot = () => {
    const { navigate, _toggleModal } = this.props
    navigate('Profile')
    _toggleModal()
  }

  render() {
    return (
      <Container style={{ elevation: 3, backgroundColor: 'rgba(52, 52, 52, 0.01)'}}>
        <View >
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.cards()}
            renderItem={item =>
            <Card style={{ elevation: 3, marginTop: 50}} >
              <CardItem>
                <Left>
                  <Thumbnail source={item.imageThumbnail} />
                  <Body>
                    <Text>{item.text}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={item.imageBig} />
              </CardItem>
            </Card>
            }
          />
          </View>
          <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-around' }}>
            <Button 
              danger
              onPress={this._deleteSpot} 
              style={{backgroundColor: '#D55367', height: 70, width: 70, borderRadius: 15}}>
                <Icon type="FontAwesome" name="times" style={{textAlign: 'center', paddingLeft: 8}} />
            </Button>
            <Button 
              success
              onPress={this._thanksSpot}
              style={{backgroundColor: '#00AA7B', height: 70, width: 70, borderRadius: 15}}>
                <Icon type="FontAwesome" name="check" style={{textAlign: 'center', paddingLeft: 8}} />
            </Button>
          </View>
      </Container>
    )
  }
}
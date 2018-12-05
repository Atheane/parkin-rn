import React from 'react'
import { View as RNView, Image } from 'react-native'
import Modal from 'react-native-modal'
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

export default (props) => {
  const cardsData = () => {
    return [
      {
        text: props.arrivalSpot.title,
        name: props.arrivalSpot.body,
        imageThumbnail: require('../assets/spot.png'),
        imageBig: require('../assets/ParkingSpot.jpg'),
      }
    ]
  }
  return (
    <RNView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal isVisible={props.isArrivalModalVisible}>
        <Container style={{ elevation: 3, backgroundColor: 'rgba(52, 52, 52, 0.01)'}}>
          <View >
            <DeckSwiper
              ref={(c) => props._deckSwiper = c}
              dataSource={cardsData()}
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
                onPress={props._deleteSpot} 
                style={{backgroundColor: '#D55367', height: 70, width: 70, borderRadius: 15}}>
                  <Icon type="FontAwesome" name="times" style={{textAlign: 'center', paddingLeft: 8}} />
              </Button>
              <Button 
                success
                onPress={props._thanksSpot}
                style={{backgroundColor: '#00AA7B', height: 70, width: 70, borderRadius: 15}}>
                  <Icon type="FontAwesome" name="check" style={{textAlign: 'center', paddingLeft: 8}} />
              </Button>
          </View>
        </Container>
      </Modal>
    </RNView>
  )
}
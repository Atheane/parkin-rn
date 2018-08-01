import React, { Component } from 'react'
import { Image, AsyncStorage, StyleSheet } from 'react-native'
import { Container, Body, Button, Text } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'

import Loading from './Loading'


export default class extends Component {
  // console.log("In Profile, ScreenProps", screenProps)
  constructor(props) {
    super(props)
    this.state = {
      userInfo: this.props.screenProps.userInfo, 
    }
  }

  // componentDidMount() {
  //   this._retrieveData()
  // }

  _logOut = () => {
    async () => AsyncStorage.clear()
    this.setState({userInfo: null})
  }

  render() {
    const userInfo = this.state.userInfo
    console.log("in Profile", userInfo)
    if (userInfo) {
      return (
        <Container>
          <Grid style={styles.background}>
            <Row size={3}>
              <Body>
                <Image
                  source={{ uri: userInfo.picture.data.url }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={styles.text}>{userInfo.name}</Text>
              </Body>
            </Row>
            <Row size={1}>
              {/* <Col>
                <Button light block onPress={this._logOut}>
                  <Text> Log Out</Text>
                </Button>
              </Col> */}
            </Row>
          </Grid>
        </Container>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(51, 79, 141, 0.50)',
    height: 200
  },
  text: { 
    fontSize: 20, 
    color: 'white',
    paddingTop: 36,
    textAlign: 'center' 
  },
  button: {

  }
})
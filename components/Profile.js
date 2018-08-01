import React, { Component } from 'react'
import { Image, AsyncStorage, StyleSheet } from 'react-native'
import { Container, Header, Body, Button, Text } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import Login from './Login'

// import Loading from './Loading'


export default class extends Component {
  // console.log("In Profile, ScreenProps", screenProps)
  constructor(props) {
    super(props)
    this.state = {
      userInfo: this.props.screenProps.userInfo, 
    }
  }

  _getUserInfo = (userInfo) => {
    this.setState({userInfo})
  }

  _logOut = () => {
    const keys = ['ParkinUserInfo']
    AsyncStorage.multiRemove( keys, (error) => {
      if (error) { console.log(error) }
    })
    this.setState({userInfo: null})
    alert("You are Logged out")
    console.log("AsyncStorage is cleaning#################")
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
              <Col>
                <Button light block onPress={this._logOut}>
                  <Text> Log Out</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Container>
      )
    } else {
      return ( <Login _getUserInfo={this._getUserInfo}/>)
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
  }
})
import React, { Component } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import { AuthSession } from 'expo'
import { Container, Header, Icon, Text, Button, Thumbnail, Body } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'



const FB_APP_ID = '261733521288349'

export default (WrappedComponent) => {
  return (
    class extends Component {
      constructor(props) {
        super(props)
        this.state = {
          userInfo: null
        }
      }
    
      componentDidMount() {
        console.log("login did mount")
        this._retrieveData()
      }
    
      _storeData = async (userInfo) => {
        console.log("In store Data", userInfo)
        try {
          await AsyncStorage.setItem('ParkinUserInfo', JSON.stringify(userInfo))
        } catch (error) {
          console.log({errorMessage: error, component: "Login.js" })
        }
      }
    
      _retrieveData = async () => {
        console.log("In retrieve Data")
        try {
          const userInfo = await AsyncStorage.getItem('ParkinUserInfo')
          if (userInfo !== null) {
            this.setState({ userInfo })
            console.log(userInfo)
          } else {
            console.log({errorMessage: "userInfo null in Async Storage", component: "Login.js" })
          }
         } catch (error) {
          console.log({errorMessage: error, component: "Login.js" })
         }
      }
    
      _handlePressAsync = async () => {
        let redirectUrl = AuthSession.getRedirectUrl()
    
        // You need to add this url to your authorized redirect urls on your Facebook app
        console.log({ redirectUrl })
    
        // NOTICE: Please do not actually request the token on the client (see:
        // response_type=token in the authUrl), it is not secure. Request a code
        // instead, and use this flow:
        // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
        // The code here is simplified for the sake of demonstration. If you are
        // just prototyping then you don't need to concern yourself with this and
        // can copy this example, but be aware that this is not safe in production.
    
        let result = await AuthSession.startAsync({
          authUrl:
            `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
            `&client_id=${FB_APP_ID}` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        })
    
        if (result.type !== 'success') {
          alert('Uh oh, something went wrong')
          return
        }
    
        let accessToken = result.params.access_token;
        let userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
        )
        const userInfo = await userInfoResponse.json()
        this.setState({ userInfo })
        this._storeData(userInfo)
      }
    
      render() {
        const display = (!this.state.userInfo) ? (
            <Container>
              <Header />
              <Grid style={styles.background}>
                <Row size={2}>
                  <Body>
                    <Thumbnail 
                      style={{width: 150, height: 150}}
                      source={require('../assets/facebook_logo.png')} 
                    />
                    <Text style={styles.title}> Parkin </Text>
                    <Text style={styles.subtitle}> We Park Together </Text>
                  </Body>
                </Row>
                <Row size={1}>
                  <Col size={1}>
                  </Col>
                  <Col size={3}>
                    <Button iconLeft onPress={this._handlePressAsync} style={styles.button} >
                      <Icon type="FontAwesome" name="facebook" />
                      <Text>SignIn with Facebook</Text>
                    </Button>
                  </Col>
                  <Col size={1}>
                  </Col>
                </Row>
              </Grid>
            </Container>
        ) : (
          <WrappedComponent {...this.state} {...this.props} />
        )
        return (display)
      }
    }
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(51, 79, 141, 0.50)',
    height: 200
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 24
  },
  subtitle: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white'
  },
  button: {
    borderRadius: 50, 
    backgroundColor:"#41629D"
  }
})


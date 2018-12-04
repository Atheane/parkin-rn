import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Icon, Text, Button, Thumbnail, Body } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default (props) => {
  return (
    <Container>
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
            <Button iconLeft onPress={props.handleOnPress} style={styles.button} > 
              <Icon type="FontAwesome" name="facebook" />
              <Text>SignIn with Facebook</Text>
            </Button>
          </Col>
          <Col size={1}>
          </Col>
        </Row>
      </Grid>
    </Container>
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
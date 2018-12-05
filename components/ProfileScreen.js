import React, { Component } from 'react'
import { Image, AsyncStorage, StyleSheet } from 'react-native'
import { Container, Body, Button, Text } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import AuthLoadingScreen from './AuthLoadingScreen'

export default (props) => {
  const { facebookJson } = props
  return (
    <Container>
      <Grid style={styles.background}>
        <Row size={3}>
          <Body>
            <Image
              source={{ uri: facebookJson.picture.data.url }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={styles.text}>{facebookJson.name}</Text>
          </Body>
        </Row>
        <Row size={1}>
          <Col>
            <Button light block onPress={props._logOut}>
              <Text> Log Out</Text>
            </Button>
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
  text: { 
    fontSize: 20, 
    color: 'white',
    paddingTop: 36,
    textAlign: 'center' 
  }
})
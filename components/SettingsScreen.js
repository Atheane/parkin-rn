import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Thumbnail, Body } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default (props) => {
  return (
    <Container>
      <Grid style={styles.background}>  
        <Row size={1} style={{marginTop: 0}}>
          <Body >
            <Text style={styles.p}>
            Parkin App needs to know your location to find close parking spots. Please autorize location. </Text>
          </Body>
        </Row>   
      </Grid>
    </Container>
  )
}


const styles = StyleSheet.create({
  background: {
    backgroundColor: '#dde1ee',
    height: 200
  },
  p: {
    width: 250
  }
})
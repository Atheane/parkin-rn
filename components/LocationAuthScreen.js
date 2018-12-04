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
            Parkin App need to know your location to find close parking spots. Please autorize location. </Text>
          </Body>
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
  p: {
    fontSize: 14, 
    color: 'black',
    width: 250,
    textAlign: 'center'
  },
  button: {
    borderRadius: 50, 
    backgroundColor:"#41629D"
  }
})
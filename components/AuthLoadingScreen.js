import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Body, Spinner } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'

export default () => {
  return (
    <Container>
      <Grid style={styles.background}>
        <Row size={3}>
          <Body>
            <Spinner color='blue' />
          </Body>
        </Row>
        <Row size={1}>
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
})
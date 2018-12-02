import React from 'react'
import { Container, Header, Icon, Text, Button, Thumbnail, Body } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default (props) => {
  return (
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
            <Button iconLeft onPress={this.props.handlePressAsync} style={styles.button} > {/* todo pass onPress in container*/}
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
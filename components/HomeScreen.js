import React from 'react'
import { Container, Header } from 'native-base'
import { FooterNavigator } from './FooterNavigator';

export default (props) => {

  return (
    <Container>
      <Header />
      <FooterNavigator navigation={props.navigation}/>
    </Container>
  )
}


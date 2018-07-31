import React from 'react'
import { Container, Header, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base'


export default (props) => {
  return (
    <Container>
      <Header />
      {props.children}
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="search" />
            <Text>Search</Text>
          </Button>
          <Button vertical>
            <Icon name="chatbubbles" />
            <Text>Chat</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>Profile</Text>
          </Button>
          <Button vertical>
            <Icon name="settings" />
            <Text>Params</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}
import React, { Component } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import { onSpotNearMe } from '../utils/sockets'
import CardModal from './CardModal'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      message: ''
    }
  }

  componentDidMount() {
    onSpotNearMe((data) => {
      if (data) {
        this.setState({ isModalVisible: true, message: data})
      } else {
        console.log({
          errorMessage: "No data received from socket spotNearMe",
          component: "ArrivalModal.js"
        })
      }
    })
  }

  _toggleModal = () => {
    this.setState((prevState) => ({ 
      isModalVisible: !prevState.isModalVisible 
    }))
  }  
  
  render() {
    const { message, isModalVisible } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <CardModal message={message} {...this.props} _toggleModal={this._toggleModal} />
        </Modal>
      </View>
    );
  }
}

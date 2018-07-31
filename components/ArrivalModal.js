import React, { Component } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import { onSpotNearMe } from '../utils/sockets'
import CardModal from './CardModal'

class ArrivalModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: (this.props.fontLoaded) ? true : false,
      message: ''
    }
    onSpotNearMe((message)=> {
      this.setState({
        isModalVisible: (this.props.fontLoaded) ? true : false,
        message
      })
    })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible })

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.state.isModalVisible}>
          <CardModal {...this.state} {...this.props} />
        </Modal>
      </View>
    );
  }
}

export default ArrivalModal

import React, { Component } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import { onSpotNearMe } from '../utils/sockets'
import CardModal from './CardModal'

class ArrivalModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      message: ''
    }
  }

  componentDidMount() {
    console.log("ArrivalModal.js is mounted")
    onSpotNearMe((message) => {
      if (this.props.watchId) {
        console.log(this.props.watchId)
        this.props.watchId.remove()
      } else {
        console.log({
          errorMessage: "Trying to remove watchId, but watchId undefined",
          component: "ArrivalModal.js"
        })
      }
      this.setState({
        isModalVisible: (this.props.fontLoaded) ? true : false,
        message
      })
    })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible })

  componentWillUnmount() {
    console.log("ArrivalModal.js Will Unmount")
  }

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

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
      message: '',
      mounted: false //so anti-pattern, hot-fix, to-do check why ArrivalModal unmount when it should not !
    }
  }

  componentDidMount() {
    console.log("ArrivalModal.js is mounted")
    this.state.mounted = true
    onSpotNearMe((message) => {
      if (message && this.props.watchId) {
        console.log(this.props.watchId)
        this.props.watchId.remove()
      } else {
        console.log({
          errorMessage: "Should remove watchId, but watchId undefined",
          component: "ArrivalModal.js"
        })
      }
      if (this.state.mounted) {
        this.setState({
          isModalVisible: (this.props.fontLoaded) ? true : false,
          message
        })
      }
    })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible })

  componentWillUnmount() {
    console.log("ArrivalModal.js Will Unmount")
    this.state.mounted = false
  }   
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.state.isModalVisible}>
          <CardModal {...this.state} {...this.props} _toggleModal={this._toggleModal} />
        </Modal>
      </View>
    );
  }
}

export default ArrivalModal

import React from 'react'
import Map from '../components/Map'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { emitDeleteSpot, toggleModal } from '../actions'
import ModalScreen from '../components/ModalScreen'

const mapDispatchToProps = (dispatch) => {
  return {
    emitDeleteSpot: (socket, arrivalSpot, token) => {
      dispatch(emitDeleteSpot(socket, arrivalSpot, token))
    },
    toggleModal: (isArrivalModalVisible) => {
      dispatch(toggleModal(isArrivalModalVisible))
    },
    navigateToHome: () => {
      dispatch(NavigationActions.navigate({routeName: 'Home'}))
    },
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    socket: reduxState.socket,
    facebookJson: reduxState.facebookJson,
    arrivalSpot: reduxState.arrivalSpot,
    isArrivalModalVisible: reduxState.isArrivalModalVisible
  }
}

export default compose(
  connect(
    mapReduxStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    _deleteSpot: (props) => e => {
      const { socket, arrivalSpot, facebookJson, isArrivalModalVisible } = props
      const token = facebookJson.id
      const coord = arrivalSpot.coord
      props.emitDeleteSpot(socket, coord, token)
      props.toggleModal(isArrivalModalVisible)
      props.navigateToHome()
    },
    _thanksSpot: (props) => e => {
      const { isArrivalModalVisible } = props
      props.toggleModal(isArrivalModalVisible)
      props.navigateToHome()
    },
  })
)(React.memo(ModalScreen))


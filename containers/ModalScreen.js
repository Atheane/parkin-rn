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
    toggleModal: () => {
      dispatch(toggleModal())
    },
    navigateToMain: () => {
      dispatch(NavigationActions.navigate({routeName: 'Main'}))
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
    _deleteSpot: ({ socket, arrivalSpot, facebookJson }) => e => {
      const token = facebookJson.id
      const coord = arrivalSpot.coord
      props.emitDeleteSpot(socket, coord, token)
      props.toggleModal()
      props.navigateToMain()
    },
    _thanksSpot: (props) => e => {
      props.toggleModal()
      props.navigateToMain()
    },
  })
)(React.memo(ModalScreen))


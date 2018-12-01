import React from 'react'
import MarkerList from '../components/MarkerList'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { getSpots } from '../actions'

const mapReduxStateToProps = (reduxState) => {
  return {
    spots: reduxState.spots
  }
}

export default compose(
  connect(
    mapReduxStateToProps
  ),
  // withHandlers({ 
  //   handleOnPress: props => e => {
  //     // props.registerForPushNotifications()
  //     // console.log('ZZZZZZZZZZZZZZZZ in handleOnPress, props', props)
  //     if (props.screenProps.userInfo) {
  //       emitSelectSpot({
  //         coord: e.nativeEvent.coordinate,
  //         token: props.screenProps.userInfo.id
  //       })
  //     }
  //     e.persist()
  //     props.watchLocationAsync()
  //     handleGetDirections(e)
  //   }
  // }),
)(React.memo(MarkerList)) // https://reactjs.org/blog/2018/10/23/react-v-16-6.html


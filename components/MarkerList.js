import React from 'react'
import { MapView } from 'expo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle, withProps } from 'recompose'
import { setSpots } from '../actions'


const Marker = MapView.Marker

let counter = 0

const renderCounter = () => {
  counter += 1
  console.log(`Render #${counter} in MarkerList.js`)
}

const MarkerList = (props) => {
  const { spots, handleOnPress } = props
  if (spots && spots.length > 0) {
    renderCounter()
    return spots.map((spot, i) => (
      <Marker 
        key={i}
        title={spot.name}
        coordinate={spot.coords}
        image={(spot.selected) ? require('../assets/selectedSpot.png') : require('../assets/spot.png')}
        onPress={handleOnPress}
      />
    ))
  } else {
    console.log({errorMessage: "no spots", component: "MarkerList"})
    return null
  }
}

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.setSpots()
    },
  }),
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
)(MarkerList)

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setSpots }, dispatch
  )
}

function mapReduxStateToProps(reduxState) {
  return {
    spots: reduxState.spots
  }
}
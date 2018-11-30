import React from 'react'
import { MapView } from 'expo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setSpots } from '../actions'


const Marker = MapView.Marker

const MarkerList = (props) => {
  const { spots, handleOnPress } = props
  console.log('>>>>>>>>>>>>>>>> In MarkerList.js')
  console.log('spots')
  console.log(spots)
  // debugger
  if (spots && spots.constructor === Array) {
    return spots.map((spotObj, i) => (
      <Marker 
        key={i}
        title={(spotObj.spot && spotObj.spot.name) ? spotObj.spot.name : '44x44' }
        coordinate={(spotObj.spot && spotObj.spot.coords) ? spotObj.spot.coords : {
            latitude: 48.886,
            longitude: 2.322
          }
        }
        image={(spotObj.selected) ? require('../assets/selectedSpot.png') : require('../assets/spot.png')}
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
)(React.memo(MarkerList))

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
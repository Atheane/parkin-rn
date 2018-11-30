import React from 'react'
import { MapView } from 'expo'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setPosition } from '../actions'
import NightStyle from './NightStyle'
import MarkerList from './MarkerList'

const Map = (props) => {
  const { currentUserPosition } = props
  return (
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={NightStyle}
        style={styles.container}
        region={currentUserPosition}
        showsUserLocation
        showsMyLocationButton
        showsTraffic
        minZoomLevel={15}
        loadingEnabled
      >
        <MarkerList />
      </MapView>
  )
}

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.setPosition()
    },
  })
)(Map)


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setPosition }, dispatch
  )
}

function mapReduxStateToProps(reduxState) {
  return {
    currentUserPosition: reduxState.currentUserPosition
  }
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  size: {
    width: 32,
    height: 32,
  }
}


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
      const token = this.props.userInfo.id
      this.props.setPosition(token)
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

// import { connect } from 'react-redux';
// import { sendMessage, navigateTo } from './actions';

// const mapDispatchToProps = dispatch => ({
//  sendMessage: messaga => {
//  dispatch(sendMessage(message));
//  dispatch(navigateTo({ routeName: 'messagesList' }));
//  },
// });

// export default connect(null, mapDispatchToProps)(MessageSending);
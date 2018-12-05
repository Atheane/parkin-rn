import React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import withAsyncStorage from '../HOC/withAsyncStorage'
import ProfileScreen from '../components/ProfileScreen'


const mapDispatchToProps = (dispatch) => {
  return {
    navigateToAuth: () => {
      dispatch(NavigationActions.navigate({routeName: 'Auth'}))
    },   
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    facebookJson: reduxState.facebookJson,
  }
}

export default compose(
  connect(
    mapReduxStateToProps,
    mapDispatchToProps
  ),
  withAsyncStorage,
  withHandlers({
    _logOut: (props) => e => {
      props.removeFromStorage('ParkinFacebookJson')
      props.navigateToAuth()
    },
  })
)(React.memo(ProfileScreen))


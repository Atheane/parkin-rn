import React from 'react'
import Map from '../components/Map'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setPosition } from '../actions/app'

const mapDispatchToProps = (dispatch) => {
  return {
    setPosition: (token) => {
      dispatch(setPosition(token))
    }
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    userPosition: reduxState.userPosition
  }
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


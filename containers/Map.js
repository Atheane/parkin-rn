import React from 'react'
import Map from '../components/Map'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { setPosition } from '../actions/data'

const mapDispatchToProps = (dispatch) => {
  return {
    setPosition: (token) => {
      dispatch(setPosition(token))
    }
  }
}

const mapReduxStateToProps = (reduxState) => {
  return {
    data: reduxState.data.userPosition,
    token: reduxState.user.id
  }
}

export default compose(
  connect(
    mapReduxStateToProps, 
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const { token } = this.props
      this.props.setPosition(token)
    },
  })
)(Map)


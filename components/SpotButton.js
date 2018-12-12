import React from 'react'
import { Svg } from 'expo'
import { TouchableHighlight } from 'react-native'

export default (props) => {


  // debugger
  return (
    <TouchableHighlight onPress={console.log('Should give a spot')} style={styles.button} >
      <Svg height="100" width="100" fill="rgb(238,162,35)" style={styles.svg} >
        <Svg.Defs>
          <Svg.LinearGradient
            id="grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="50"
          >          
            <Svg.Stop offset="0" stopColor="rgb(238,162,35)" />
            <Svg.Stop offset="1" stopColor="rgb(254,118,82)" stopOpacity="1" />
          </Svg.LinearGradient>
        </Svg.Defs>
        <Svg.Circle
          cx="40"
          cy="40"
          r="36"
          strokeWidth={3}
          stroke="rgb(255,255,255)"
          fill="url(#grad)"
        />
        <Svg.Circle
          cx="40"
          cy="40"
          r="15"
          strokeWidth={3}
          stroke="rgb(255,255,255)"
          fill="rgb(255,214,157)"
        />
        <Svg.Polygon             
            points="34,54 46,54 40,62"
            fill="rgb(255,255,255)"
            stroke="rgb(255,255,255)"
            strokeWidth={1} /> 
        </Svg>
    </TouchableHighlight>
  )
}

// to-do : look for filter implementation in react-native-svg for dropShadow in giveSpotButton
// https://github.com/react-native-community/react-native-svg/issues/150

const styles = {
  button: {
    position: 'absolute',
    width: 70, 
    height: 70, 
    bottom: 30, 
    right: 30,
    zIndex: 1,
    // backgroundColor: "transparent"
  },
  svg: {
    position: 'relative',
    bottom: 0, 
    right: 0, 
    zIndex: 2
  }
}
import React from 'react'
import { 
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import Map from '../containers/Map'

const Search = (props) => {
  const { screenProps, userPosition } = props
  // console.log(">>>>>>>>>>>>>>>>> In Search.js, SearchUI")
  // console.log("spots", spots)
  // console.log("userPosition", userPosition)

  let display
  if (Platform.OS === 'ios') {
    display = (
      <SafeAreaView style={styles.container}>
        <Map {...screenProps}
        userPosition={userPosition}
        />
      </SafeAreaView>
    )
  } else {
    display = (
      <View style={styles.container}>
        <Map {...screenProps} 
           userPosition={userPosition}
           />
      </View>
    )
  }
  return ( display )
}

export default React.memo(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

// import { connect } from 'react-redux';
// import { sendMessage, navigateTo } from './actions';

// const mapDispatchToProps = dispatch => ({
//  sendMessage: messaga => {
//  dispatch(sendMessage(message));
//  dispatch(navigateTo({ routeName: 'messagesList' }));
//  },
// });

// export default connect(null, mapDispatchToProps)(MessageSending);

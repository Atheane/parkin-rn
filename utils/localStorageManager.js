
import { AsyncStorage } from 'react-native'

export const getUserFromStorage = async () => {
  try {
    const unparsedUserInfo = await AsyncStorage.getItem('ParkinUserInfo')
    const userInfo = JSON.parse(unparsedUserInfo)
    // socket.emit('userInfo', userInfo) to-do emitUser
    if (userInfo !== null) {
      console.log("in login", userInfo)
    } else {
      console.log({errorMessage: "userInfo null in Async Storage", component: "getUserFromStorage" })
    }
    return userInfo
   } catch (error) {
    console.log({errorMessage: error, component: "getUserFromStorage" })
    return null
   }
}

export const setUserToStorage = async (userInfo) => {
  console.log("In login.js")
  console.log("In _storeData", userInfo)
  try {
    await AsyncStorage.setItem('ParkinUserInfo', JSON.stringify(userInfo))
  } catch (error) {
    console.log({errorMessage: error, component: "login.js" })
  }
}
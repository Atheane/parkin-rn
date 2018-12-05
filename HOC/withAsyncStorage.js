import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

export default (WrappedComponent) => {
  const loadFromStorage = async (key) => {
    const unparsedJson = await AsyncStorage.getItem(key)
    const parsedJson = JSON.parse(unparsedJson)
    return parsedJson
  }
  const saveToStorage = (key, value) => {
    AsyncStorage.setItem(key, value)
  }
  const removeFromStorage = (key) => {
    AsyncStorage.removeItem(key)
  }
  
  return (props) => (
    <WrappedComponent
      loadFromStorage={loadFromStorage}
      saveToStorage={saveToStorage}
      removeFromStorage={removeFromStorage}
      {...props}
    />
  )
}


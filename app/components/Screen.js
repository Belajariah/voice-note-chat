import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import colors from '../utils/colors'

const Screen = ({ children, style }) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
  },
})

export default Screen

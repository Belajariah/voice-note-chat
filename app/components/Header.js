import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../utils/colors'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
})

export default Header

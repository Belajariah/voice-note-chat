import React from 'react'
import { View, StyleSheet } from 'react-native'

import MyChat from './OtherChat'
import OtherChat from './MyChat'

const Message = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.user_code !== 1 ? (
        <MyChat item={item} />
      ) : (
        <OtherChat item={item} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
})

export default Message

import React, { useRef } from 'react'
import { ScrollView } from 'react-native'

import Message from './Message'

const Messages = ({ messages }) => {
  const scrollViewRef = useRef()

  const audios = messages.map((a) => a.Recording_Name)

  return (
    <ScrollView
      style={{ paddingHorizontal: 5 }}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }>
      {messages.map((item) => (
        <Message key={item.id} item={item} />
      ))}
    </ScrollView>
  )
}

export default Messages

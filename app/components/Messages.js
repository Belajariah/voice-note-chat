import React, { useRef, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import Message from './Message'

const Messages = ({ messages }) => {
  const scrollViewRef = useRef()
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false)

  let audios = []

  messages.map((a) => {
    if (a.Recording_Name !== '') {
      audios.push({
        id: a.id.toString(),
        url: a.Recording_Name,
        type: 'default',
        title: 'Audio...',
      })
    }
  })

  const trackPlayerInit = async () => {
    await TrackPlayer.setupPlayer()
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PLAY_FROM_ID,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
    })
    await TrackPlayer.add(audios)
    return true
  }

  const startPlayer = async () => {
    let isInit = await trackPlayerInit()
    setIsTrackPlayerInit(isInit)
  }

  return (
    <ScrollView
      style={{ paddingHorizontal: 5 }}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }>
      {messages.map((item) => (
        <Message
          key={item.id}
          item={item}
          isTrackPlayerInit={isTrackPlayerInit}
          startPlayer={startPlayer}
        />
      ))}
    </ScrollView>
  )
}

export default Messages

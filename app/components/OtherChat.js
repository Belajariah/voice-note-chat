import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import Icon from 'react-native-vector-icons/FontAwesome'

import colors from '../utils/colors'
import secondsToTime from '../utils/secondsToTime'

const OtherChat = ({ item }) => {
  const [showPause, setShowPause] = useState(false)

  const handlePlayAudio = async (url) => {
    setShowPause(true)

    await TrackPlayer.setupPlayer()

    await TrackPlayer.add({
      id: 'trackId',
      url,
      title: 'Track Title',
      artist: 'Track Artist',
    })

    await TrackPlayer.play()
  }

  const handlePauseAudio = () => {
    setShowPause(false)

    TrackPlayer.pause()
  }

  return (
    <View style={styles.rightMessage}>
      <Text style={styles.username}>{item.username}</Text>

      {item.Recording_Name !== '' && (
        <View style={styles.soundContainer}>
          {showPause ? (
            <Icon
              name='pause'
              size={20}
              color={colors.medium}
              onPress={handlePauseAudio}
              style={styles.icon}
            />
          ) : (
            <Icon
              name='play'
              size={20}
              color={colors.medium}
              onPress={() => handlePlayAudio(item.Recording_Name)}
              style={styles.icon}
            />
          )}
          <View style={styles.music}>
            <View style={styles.musicBar}>
              <View style={styles.counter}></View>
            </View>
            <Text style={styles.timer}>
              {secondsToTime(item.voice_duration)}
            </Text>
          </View>
        </View>
      )}

      {item.Recording_Name !== '' ? (
        <View style={styles.slide}>
          <Text style={styles.slideUsername}>{item.username}</Text>
          <Text style={styles.slideMessage}>{item.message}</Text>
        </View>
      ) : (
        <Text style={styles.text}>{item.message}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  rightMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    maxWidth: '70%',
  },
  text: {
    fontSize: 14,
    color: colors.white,
  },
  username: {
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  description: {
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  soundContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  music: {
    flex: 1,
    marginTop: 7,
  },
  musicBar: {
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    overflow: 'hidden',
  },
  counter: {
    borderWidth: 1,
    backgroundColor: colors.black,
    width: '0%',
    height: 5,
  },
  icon: {
    width: 30,
  },
  timer: {
    color: colors.medium,
    marginVertical: 5,
  },
  slide: {
    borderWidth: 1,
    borderLeftWidth: 5,
    borderRadius: 5,
    borderColor: colors.medium,
    padding: 5,
  },
  slideMessage: {
    color: colors.medium,
  },
  slideUsername: {
    color: colors.medium,
    fontWeight: 'bold',
  },
})

export default OtherChat

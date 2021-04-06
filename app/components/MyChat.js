import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player'
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/FontAwesome'

import colors from '../utils/colors'
import secondsToTime from '../utils/secondsToTime'

const MyChat = ({ item }) => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const { position, duration } = useTrackPlayerProgress(250)

  const trackPlayerInit = async () => {
    await TrackPlayer.setupPlayer()
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
    })
    await TrackPlayer.add({
      id: item.id,
      url: item.Recording_Name,
      type: 'default',
      // title: songDetails.title,
      // album: songDetails.album,
      // artist: songDetails.artist,
      // artwork: songDetails.artwork,
    })
    return true
  }

  const startPlayer = async () => {
    let isInit = await trackPlayerInit()
    setIsTrackPlayerInit(isInit)
  }

  useEffect(() => {
    if (item.Recording_Name !== '') {
      startPlayer()
    }
  }, [])

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration)
    }
  }, [position, duration])

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  })

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play()
    } else {
      TrackPlayer.pause()
    }
  }

  const slidingStarted = () => {
    setIsSeeking(true)
  }

  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(value * duration)
    setSliderValue(value)
    setIsSeeking(false)
  }

  return (
    <View style={styles.leftMessage}>
      <Text style={styles.username}>
        {item.user_code === 1 ? 'Anda' : item.username}
      </Text>

      {item.Recording_Name !== '' ? (
        <View style={styles.soundContainer}>
          <TouchableOpacity
            onPress={() => onButtonPressed(item.Recording_Name)}
            disabled={!isTrackPlayerInit}>
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.music}>
            <Slider
              style={{ width: 200 }}
              minimumValue={0}
              maximumValue={1}
              value={sliderValue}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.white}
              onSlidingStart={slidingStarted}
              onSlidingComplete={slidingCompleted}
              thumbTintColor={colors.primary}
            />
            <Text style={styles.timer}>
              {position
                ? secondsToTime(position)
                : secondsToTime(item.voice_duration)}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.text}>{item.message}</Text>
      )}

      {item.is_action_taken && (
        <View style={styles.slide}>
          <Text style={styles.slideUsername}>
            {item.user_code === 1 ? 'Anda' : item.username}
          </Text>
          <Text style={styles.slideMessage}>{item.message}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  leftMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.tertiary,
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    borderTopRightRadius: 0,
    maxWidth: '70%',
  },
  text: {
    fontSize: 14,
    color: colors.white,
  },
  username: {
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 7,
  },
  description: {
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  soundContainer: {
    flexDirection: 'row',
  },
  music: {
    marginTop: 3,
    alignItems: 'center',
  },
  counter: {
    borderWidth: 1,
    backgroundColor: colors.black,
    width: '0%',
    height: 5,
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

export default MyChat

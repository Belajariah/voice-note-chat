import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from './app/components/Header'
import Messages from './app/components/Messages'
import Screen from './app/components/Screen'
import messages from './app/data/messages'
import colors from './app/utils/colors'

const audioRecorderPlayer = new AudioRecorderPlayer()

const App = () => {
  const [data, setData] = useState(messages)
  const [text, setText] = useState('')
  const [audio, setAudio] = useState('')
  const [audioDuration, setAudioDuration] = useState('')
  const [recordTime, setRecordTime] = useState('')
  const [playTime, setPlayTime] = useState('')
  const [duration, setDuration] = useState('0')
  const [isPlaying, setIsPlaying] = useState(false)

  const [showSendButton, setShowSendButton] = useState(false)
  const [showRecording, setShowRecording] = useState(false)
  const [showHandleAudio, setShowHandleAudio] = useState(false)
  const [showPlayTimeAndDuration, setShowPlayTimeAndDuration] = useState(false)

  useEffect(() => {
    if (playTime == duration) {
      setIsPlaying(false)

      audioRecorderPlayer.stopPlayer()
      audioRecorderPlayer.removePlayBackListener()
    }
  }, [playTime, duration])

  const onStartRecord = async () => {
    setShowRecording(true)

    await audioRecorderPlayer.startRecorder()

    audioRecorderPlayer.addRecordBackListener((e) => {
      const time = audioRecorderPlayer
        .mmssss(Math.floor(e.current_position))
        .toString()
        .substr(0, 5)

      setRecordTime(time)
    })
  }

  const onStopRecord = async () => {
    await audioRecorderPlayer.addRecordBackListener((e) => {
      let duration = e.current_position.toString()
      duration = duration.substr(0, duration.length - 3)
      setAudioDuration(duration)
    })

    const result = await audioRecorderPlayer.stopRecorder()

    audioRecorderPlayer.removeRecordBackListener()

    setAudio(result)
  }

  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer()

    audioRecorderPlayer.addPlayBackListener((e) => {
      const position = audioRecorderPlayer
        .mmssss(Math.floor(e.current_position))
        .toString()
        .substr(0, 5)
      const duration = audioRecorderPlayer
        .mmssss(Math.floor(e.duration))
        .toString()
        .substr(0, 5)

      setPlayTime(position)
      setDuration(duration)

      return
    })
  }

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer()
  }

  const handleSendText = () => {
    setData((prevData) => [
      ...prevData,
      {
        id: Math.random(),
        user_code: 1,
        username: 'Rico Wijaya',
        voice_code: 3,
        voice_duration: 0,
        taken_id: 2,
        taken_by: 'Ust. Riki Jenifer',
        class_catgory: 'Tahsin',
        status: 'Waiting for Response',
        is_play: false,
        is_read: false,
        is_action_taken: false,
        created_date: new Date(),
        message: text,
        Recording_Name: '',
      },
    ])

    setText('')
    setShowSendButton(false)
  }

  const handleSendAudio = () => {
    if (audio === '' || audio === 'Already stopped')
      return ToastAndroid.show(
        'Long press for recording audio!',
        ToastAndroid.SHORT,
      )

    setData((prevData) => [
      ...prevData,
      {
        id: Math.random(),
        user_code: 1,
        username: 'Rico Wijaya',
        voice_code: 3,
        voice_duration: audioDuration,
        taken_id: 2,
        taken_by: 'Ust. Riki Jenifer',
        class_catgory: 'Tahsin',
        status: 'Waiting for Response',
        is_play: false,
        is_read: false,
        is_action_taken: false,
        created_date: new Date(),
        message: '',
        Recording_Name: audio,
      },
    ])

    setAudio('')
    setShowRecording(false)
    setShowHandleAudio(false)
    setShowHandleAudio(false)
    setIsPlaying(false)
    setPlayTime('')
    setDuration('')
    setShowPlayTimeAndDuration(false)
  }

  return (
    <>
      <Header />
      <Screen style={styles.container}>
        <Messages messages={data} />
        <View style={styles.message}>
          <View style={styles.input}>
            {showRecording ? (
              <View style={styles.recording}>
                <View>
                  <Text>
                    {showPlayTimeAndDuration
                      ? `${playTime}/${duration}`
                      : recordTime}
                  </Text>
                </View>
                {showHandleAudio && (
                  <View style={styles.recordingContent}>
                    <TouchableOpacity
                      style={styles.recordingButton}
                      onPress={() => {
                        setIsPlaying(!isPlaying)

                        if (isPlaying) {
                          onPausePlay()
                        } else {
                          onStartPlay()
                          setShowPlayTimeAndDuration(true)
                        }
                      }}>
                      <Icon
                        name={isPlaying ? 'pause' : 'play'}
                        size={30}
                        color={colors.dark}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.recordingButton}
                      onPress={() => {
                        onStopRecord()
                        setShowRecording(false)
                        setShowHandleAudio(false)
                        setIsPlaying(false)
                        setPlayTime('')
                        setDuration('0')
                        setShowPlayTimeAndDuration(false)
                      }}>
                      <Icon name='close-circle' size={30} color={colors.dark} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <TextInput
                style={styles.textInput}
                multiline
                onChangeText={(e) => {
                  if (e.length > 0) {
                    setShowSendButton(true)
                    setText(e)
                  } else {
                    setShowSendButton(false)
                    setText(e)
                  }
                }}
                value={text}
              />
            )}
          </View>
          <View style={styles.buttons}>
            {showSendButton ? (
              <TouchableOpacity style={styles.button} onPress={handleSendText}>
                <Icon name='send' size={25} color={colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSendAudio}
                onLongPress={() => {
                  onStartRecord()
                  setShowHandleAudio(false)
                  setIsPlaying(false)
                  setPlayTime('')
                  setDuration('')
                  setShowPlayTimeAndDuration(false)
                }}
                onPressOut={() => {
                  onStopRecord()
                  setShowHandleAudio(true)
                }}
                style={styles.button}>
                <Icon name='microphone' size={25} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  message: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: colors.light,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  textInput: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 40,
    minHeight: 20,
    paddingHorizontal: 20,
  },
  buttons: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.white,
  },
  recording: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  recordingButton: {
    marginHorizontal: 10,
  },
  recordingContent: {
    flexDirection: 'row',
  },
})

export default App

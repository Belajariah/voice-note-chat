import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { TimerObj, TimeConvert, AskPermissionsRecording } from './utils'

import { styles } from './App-style'

const App = () => {
  const [play, setPlay] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [record, setRecord] = useState(false)
  const [message, setMessage] = useState(false)
  const [audioFile, setAudioFile] = useState('')
  const [msgSelected, setMsgSelected] = useState([])
  const [optionSelected, setOptionSelected] = useState({})

  const voiceDuration = 480 - (minutes * 60 + seconds)
  const setInput = (v, e) => FormSendMessage.setFieldValue(v, e)

  const user_login = 1
  const state = [
    {
      id: 1,
      user_code: 1,
      username: 'Rico Wijaya',
      voice_code: 1,
      voice_duration: 122,
      taken_id: 2,
      taken_by: 'Ust. Riki Jenifer',
      class_catgory: 'Tahsin',
      status: 'Completed',
      is_play: false,
      is_read: true,
      is_action_taken: true,
      created_date: new Date(),
      message: 'ustadz mau tanya dong seputar tajwid',
      Recording_Name:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 2,
      user_code: 2,
      username: 'Ust. Riki Jenifer',
      voice_code: 2,
      voice_duration: 60,
      taken_id: 1,
      taken_by: 'Ust. Riki Jenifer',
      class_catgory: 'Tahsin',
      status: 'Completed',
      is_play: false,
      is_read: true,
      is_action_taken: true,
      created_date: new Date(),
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      Recording_Name: '',
    },
    {
      id: 3,
      user_code: 1,
      username: 'Rico Wijaya',
      voice_code: 3,
      voice_duration: 146,
      taken_id: 2,
      taken_by: 'Ust. Riki Jenifer',
      class_catgory: 'Tahsin',
      status: 'Completed',
      is_play: false,
      is_read: true,
      is_action_taken: true,
      created_date: new Date(),
      message: 'ustadz mau tanya dong seputar tajwid',
      Recording_Name:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 4,
      user_code: 2,
      username: 'Ust. Riki Jenifer',
      voice_code: 4,
      voice_duration: 80,
      taken_id: 1,
      taken_by: 'Ust. Riki Jenifer',
      class_catgory: 'Tahsin',
      status: 'Completed',
      is_play: false,
      is_read: true,
      is_action_taken: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      Recording_Name: '',
    },
    {
      id: 5,
      user_code: 1,
      username: 'Rico Wijaya',
      voice_code: 3,
      voice_duration: 152,
      taken_id: 2,
      taken_by: 'Ust. Riki Jenifer',
      class_catgory: 'Tahsin',
      status: 'Waiting for Response',
      is_play: false,
      is_read: false,
      is_action_taken: false,
      created_date: new Date(),
      message: 'ustadz mau tanya dong seputar tajwid',
      Recording_Name: '',
    },
    {
      id: 6,
      user_code: 1,
      username: 'Rico Wijaya',
      voice_code: 3,
      voice_duration: 189,
      taken_id: 2,
      taken_by: 'Ust. Riki Jenifer',
      class_catgory: 'Tahsin',
      status: 'Waiting for Response',
      is_play: false,
      is_read: false,
      is_action_taken: false,
      created_date: new Date(),
      message: 'ustadz mau tanya dong seputar tajwid',
      Recording_Name:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
  ]

  const FormSendMessage = useFormik({
    initialValues: {
      User_Code: user_login.ID,
      Recording_Code: 0,
      Recording_Duration: 0,
      Description: '',
      Taken_Code: 0,
    },
    onSubmit: async (values, form) => {
      form.setSubmitting(false)
      form.resetForm()
      setMessage(false)
      setAudioFile([])
      setRecord(false)
      setPlay(false)
    },
  })

  useEffect(() => {
    let sound = null
    let music = null
    sound
    music
  }, [])

  const StartRecord = () => {
    AudioRecord.start()
  }

  const PauseRecord = () => {
    sound.pause()
  }

  const StartPathRecord = (musicUrl) => {
    console.log(musicUrl)
    music = new Sound(musicUrl, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        music.play()
      }
    })
  }

  const StopPathRecord = () => {
    music.stop()
  }

  const loadRecord = () => {
    return new Promise((resolve, reject) => {
      if (!audioFile) {
        const reason = 'File path is empty !'
        return reject(reason)
      } else {
        console.log('ok', audioFile)
        sound = new Sound(audioFile, '', (error) => {
          if (error) {
            console.log('failed to load the file', error)
            return reject(error)
          }
          return resolve()
        })
      }
    })
  }

  const ReplayRecord = async () => {
    try {
      await loadRecord()
    } catch (error) {
      console.log(error)
    }
    Sound.setCategory('Playback')
    try {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    } catch (error) {
      console.log('ERROR =>', error)
    }
  }

  const handleCancel = () => {
    sound.stop()
    setPlay(false)
    setAudioFile('')
    setMessage(false)
    setMinutes(TimerObj(480 - 1).minute)
    setSeconds(TimerObj(480 - 1).second)
  }

  const handlePlay = () => {
    setPlay(!play)
    setMinutes(TimerObj(FormSendMessage.values['Recording_Duration']).minute)
    setSeconds(TimerObj(FormSendMessage.values['Recording_Duration']).second)
    // if (play) {
    ReplayRecord()
    // } else {
    // }
    //   AskPermissionsRecording,PauseRecord()
  }

  const handlePlayList = (item) => {
    msgSelected.forEach((val, i) => {
      if (val.id == item.id) {
        let isPlay = [...msgSelected]
        isPlay[i] = {
          ...val,
          is_play:
            optionSelected.id == val.id && optionSelected.is_play
              ? false
              : true,
        }
        setMinutes(TimerObj(val.voice_duration).minute)
        setSeconds(TimerObj(val.voice_duration).second)
        setOptionSelected(isPlay[i])
      }
    })
  }

  const handleSetRecord = async () => {
    setPlay(false)
    setRecord(false)
    setMessage(true)
    setInput('Recording_Duration', voiceDuration)
    let audio = await AudioRecord.stop()
    setAudioFile(audio)
  }

  const handleRecord = () => {
    if (FormSendMessage.values['Description'].length == 0) {
      setRecord(true)
      StartRecord()
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (record) {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setRecord(!record)
            setMessage(!message)
            clearInterval(intervalId)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      } else if (play) {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setPlay(!play)
            setMinutes(
              TimerObj(FormSendMessage.values['Recording_Duration']).minute,
            )
            setSeconds(
              TimerObj(FormSendMessage.values['Recording_Duration']).second,
            )
            clearInterval(intervalId)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      } else if (optionSelected.is_play) {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setOptionSelected({
              ...optionSelected,
              is_play: false,
            })
            clearInterval(intervalId)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [seconds, minutes, record, play, optionSelected])

  useEffect(() => {
    setMsgSelected(state)
    setMinutes(TimerObj(480 - 1).minute)
    setSeconds(TimerObj(480 - 1).second)
    AskPermissionsRecording()
  }, [])

  const Header = () => {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.flexHeader}>
          <Text style={styles.textTitleWhite}>Chat</Text>
        </View>
        <View style={styles.semiBox} />
      </View>
    )
  }

  const Message = (item, index) => {
    let icon, iconUser, playRecord
    optionSelected.is_play &&
    optionSelected.id == item.id &&
    user_login != item.user_code
      ? ((icon = 'Pause'),
        (playRecord = () => StartPathRecord(item.Recording_Name)))
      : ((icon = 'Play'), (playRecord = () => StopPathRecord()))

    optionSelected.is_play &&
    optionSelected.id == item.id &&
    user_login == item.user_code
      ? ((iconUser = () => 'Pause'),
        (playRecord = StartPathRecord(item.Recording_Name)))
      : ((iconUser = 'Play'), (playRecord = () => StopPathRecord()))

    return (
      <View
        key={index}
        style={[
          styles.containerChat,
          user_login == item.user_code ? styles.flexEnd : styles.flexStart,
        ]}>
        {user_login == item.user_code ? (
          <View style={styles.containerSoundStart}>
            {item.Recording_Name.length != 0 && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    handlePlayList(item)
                    playRecord
                  }}>
                  <Button
                    onPress={() => {
                      handlePlayList(item)
                    }}
                    title={icon}
                  />
                </TouchableOpacity>
                <Text style={[styles.textSoundDuration, styles.textWhite]}>
                  {optionSelected.is_play && optionSelected.id == item.id
                    ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                    : TimeConvert(item.voice_duration)}
                </Text>
              </>
            )}
          </View>
        ) : (
          <View style={styles.containerSoundEnd}>
            <View>
              <Text style={[styles.textDesc, { textAlign: 'right' }]}>
                {item.username}
              </Text>
              {item.Recording_Name.length != 0 && (
                <View style={styles.flexRow}>
                  <Button
                    onPress={() => {
                      handlePlayList(item)
                      playRecord
                    }}
                    title={iconUser}
                  />
                  <Text style={styles.textSoundDuration}>
                    {optionSelected.is_play && optionSelected.id == item.id
                      ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                      : TimeConvert(item.voice_duration)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        <View style={styles.containerUserDesc}>
          <Text
            style={[
              styles.textDesc,
              user_login == item.user_code && styles.textPurple,
            ]}>
            Deskripsi
          </Text>
          <Text
            style={[
              styles.textUserDesc,
              user_login == item.user_code && styles.textWhite,
            ]}>
            {item.message}
          </Text>
        </View>
      </View>
    )
  }

  const VoiceMessage = () => {
    let icon
    play ? (icon = 'Pause') : (icon = 'PLay')
    return (
      message && (
        <View style={styles.containerVoice}>
          <Button onPress={() => handlePlay()} title={icon} />
          <Text style={styles.textSoundDuration}>
            {play
              ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
              : TimeConvert(FormSendMessage.values['Recording_Duration'])}
          </Text>
          <Button onPress={() => handleCancel()} title='Cancel' />
        </View>
      )
    )
  }

  const Footer = () => {
    let icons, submit
    FormSendMessage.values['Description'].length > 0
      ? ((icons = 'Send'), (submit = () => FormSendMessage.handleSubmit()))
      : message
      ? ((icons = 'Send'), (submit = () => FormSendMessage.handleSubmit()))
      : record
      ? ((icons = 'Ok'), (submit = () => handleSetRecord()))
      : ((icons = 'Record'), (submit = () => handleRecord()))

    return (
      <Button title={icons} onPress={submit} styles={styles.containerSend} />
    )
  }

  return (
    <View style={styles.containerMain}>
      <Header />
      <FlatList
        data={state}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => Message(item, index)}
      />
      <VoiceMessage />
      <View style={styles.containerTextInput}>
        <TextInput
          editable={!record}
          style={styles.textInput}
          placeholder='Ketik pesan ...'
          value={FormSendMessage.values['Description']}
          onChangeText={(e) => setInput('Description', e)}>
          {record ? (
            <Text>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          ) : null}
        </TextInput>
        <Footer />
      </View>
    </View>
  )
}

App.propTypes = {
  route: PropTypes.object,
}

export default App

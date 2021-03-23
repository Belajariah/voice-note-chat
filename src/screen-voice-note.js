import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Text,
  Platform,
  TextInput,
  PermissionsAndroid,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Buffer } from 'buffer'

import email from 'react-native-email'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'

const VoiceNote = () => {
  const [audioFile, setAudioFile] = useState([]) // ouput dir local file yang nanti akan di passing ke DB
  const [recording, setRecording] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [paused, setPaused] = useState(true)
  const [musicStop, setMusicStop] = useState(false)
  const [musicUrl, setMusicUrl] = useState('')

  // REQUEST STORAGE PERMISSIONS
  const requestWriteStoragePermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message: 'App need access to storage'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (err) {
      console.warn(err)
    }
  }

  // REQUEST AUDIO PERMISSIONS
  const requestAudioPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Access',
          message: 'App need access to audio'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (err) {
      console.warn(err)
    }
  }

  const askPermissionsAsync = async () => {
    // Warning: AudioRecord must be declare after Permissions.
    await requestAudioPermission()
    await requestWriteStoragePermission()
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'test.wav'
    }
    AudioRecord.init(options)
    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64')
      console.log('data', data)
      console.log('chubk', chunk)
      // console.log('chunk size', chunk.byteLength)
      // do something with audio chunk
    })
  }

  useEffect(() => {
    askPermissionsAsync()
    // let sound = null // sound store for local play
    // let music = null // music store for online play
    // sound // this.sound()
    // music // this.music()
  }, [])

  // FUNCTION LOCAL PLAY
  // START
  const start = () => {
    console.log('Press start record !')
    setAudioFile('')
    setRecording(true)
    setLoaded(false)
    AudioRecord.start()
  }
  // STOP
  const stop = async () => {
    if (!recording) return
    console.log('Press stop record !')
    let audioFile = await AudioRecord.stop()
    console.log('audioFile', audioFile)
    setAudioFile(audioFile)
    setRecording(false)
  }
  // LOAD
  const load = () => {
    return new Promise((resolve, reject) => {
      if (!audioFile) {
        const reason = 'File path is empty !'
        return reject(reason)
      }

      sound = new Sound(audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error)
          return reject(error)
        }
        setLoaded(true)
        return resolve()
      })
    })
  }
  // PLAY
  const play = async () => {
    if (!loaded) {
      try {
        await load()
      } catch (error) {
        console.log(error)
      }
    }

    setPaused(false)
    Sound.setCategory('Playback')

    try {
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
        setPaused(true)
      })
    } catch (error) {
      console.log('ERROR =>', error)
    }
  }
  // PAUSE
  const pause = () => {
    sound.pause()
    setPaused(true)
  }

  // FUNCTION ONLINE PLAY BY URL
  // START
  const startOnlinePlay = () => {
    music = new Sound(musicUrl, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        music.play()
      }
    })
    setMusicStop(true)
  }
  // STOP
  const stopOnlinePlay = () => {
    music.stop()
    setMusicStop(false)
  }

  // KRITIK & SARAN
  const handleEmail = () => {
    const to = ['rain.developer32@gmail.com'] // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [''], // string or array of email addresses
      bcc: '', // string or array of email addresses
      subject: 'Kritik / Saran',
      body: ''
    }).catch(console.error)
  }
  console.log(audioFile)
  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
          <View style={styles.wrapInfoDate}>
            <Text style={styles.infoDate}>{`Current: ${new Date()}`}</Text>
          </View>

          <View style={styles.groupComponent}>
            <Text style={styles.title}>Record and Play Feature.</Text>
            <View style={styles.row}>
              <Button
                onPress={start}
                title='Record'
                disabled={recording}
              />
              <Button
                onPress={stop}
                title='Stop'
                disabled={!recording}
              />
            </View>
            <View style={styles.wrapperNav}>
              <View style={styles.leftSide}>
                <Text style={styles.txtAudioFilePath}>
                  {audioFile.length > 0 ? audioFile : 'No file recorded yet !'}
                </Text>
              </View>
              <View style={styles.rightSide}>
                {paused ? (
                  <Button
                    onPress={play}
                    title='Play'
                    disabled={!(audioFile.length > 0)}
                  />
                ) : (
                  <Button
                    onPress={pause}
                    title='Pause'
                    disabled={!audioFile}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={styles.groupComponent}>
            <Text style={styles.title}>Play By Url Feature.</Text>
            <View style={styles.wrapperNav}>
              <View style={styles.leftSide}>
                <TextInput
                  placeholder='Type / Paste your sound url here ..'
                  placeholderTextColor='#fff'
                  onChangeText={text => setMusicUrl(text)}
                  color='#fff'
                  textAlign='center'
                  fontSize={13}
                />
              </View>
              <View style={styles.rightSide}>
                {
                  !musicStop ? (
                    <Button
                      onPress={startOnlinePlay}
                      title='Play'
                      disabled={!musicUrl}
                    />
                  ) : (
                    <Button
                      onPress={stopOnlinePlay}
                      title='Stop'
                      color='red'
                      disabled={!musicUrl}
                    />
                  )
                }
              </View>
            </View>
          </View>

          <View style={styles.groupComponent}>
            <Text style={styles.title}>Kritik dan Saran</Text>
            <TouchableOpacity style={styles.btnSendMail}
              onPress={() => handleEmail()}
            >
              <Text style={styles.txtSendMail}>Send email</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default VoiceNote

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30
  },
  title: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#fff'
  },
  txtAudioFilePath: {
    alignSelf: 'center',
    color: '#fff'
  },
  wrapperNav: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 50,
    borderRadius: 5
  },
  leftSide: {
    width: '80%',
    justifyContent: 'center'
  },
  rightSide: {
    width: '20%',
    justifyContent: 'center'
  },
  groupComponent: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10
  },
  wrapFooter: {
    alignSelf: 'center'
  },
  txtByDeveloper: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center'
  },
  txtCopyright: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center'
  },
  infoDate: {
    color: '#fff',
    fontSize: 13
  },
  wrapInfoDate: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  txtDescMail: {
    fontSize: 13,
    color: '#fff',
    paddingHorizontal: 10
  },
  btnSendMail: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  txtSendMail: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
})
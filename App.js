import React, { Component } from 'react'
import {
  StyleSheet, View, Button, Text, Platform, PermissionsAndroid
} from 'react-native'
import { Buffer } from 'buffer'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#000'
  },
  txtHeadTitle: {
    fontSize: 20,
    paddingVertical: 20,
    alignSelf: 'center'
  }
})

export default class App extends Component {
  sound = null

  state = {
    audioFile: [],
    recording: false,
    loaded: false,
    paused: true
  };

  async componentDidMount () {
    await this.checkPermission()

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    }

    AudioRecord.init(options)

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64')
      console.log('data', data)
      console.log('chubk', chunk)
      console.log('chunk size', chunk.byteLength)
      // do something with audio chunk
    })
  }

  checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok'
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage')
        } else {
          console.log('permission denied')
          return
        }
      } catch (err) {
        console.warn(err)
        return
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok'
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera')
        } else {
          console.log('permission denied')
          return
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  start = () => {
    console.log('start record')
    this.setState({ audioFile: '', recording: true, loaded: false })
    AudioRecord.start()
  }

  stop = async () => {
    if (!this.state.recording) return
    console.log('stop record')
    let audioFile = await AudioRecord.stop()
    console.log('audioFile', audioFile)
    this.setState({ audioFile, recording: false })
  }

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty')
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error)
          return reject(error)
        }
        this.setState({ loaded: true })
        return resolve()
      })
    })
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load()
      } catch (error) {
        console.log(error)
      }
    }

    this.setState({ paused: false })
    Sound.setCategory('Playback')

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing')
      } else {
        console.log('playback failed due to audio decoding errors')
      }
      this.setState({ paused: true })
      // this.sound.release();
    })
  }

  pause = () => {
    this.sound.pause()
    this.setState({ paused: true })
  }

  render () {
    const { recording, paused, audioFile } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.txtHeadTitle}>Voice Note Application</Text>

        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />

          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
              <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
            )}
        </View>

        <View style={{ paddingHorizontal: 30, paddingVertical: 20, borderWidth: 2, borderColor: '#fff', borderRadius: 10, marginVertical: 20, backgroundColor: '#fff' }}>
          <Text>{audioFile}</Text>
        </View>
      </View>
    )
  }
}

import { Buffer } from 'buffer'
import AudioRecord from 'react-native-audio-record'
import { Platform, PermissionsAndroid } from 'react-native'

const TimeConvert = (num) => {
  const minutes = Math.floor(num / 60)
  const seconds = num % 60
  return `${minutes}:${seconds < 10 ?
    `0${seconds}` : seconds}`
}

const TimerObj = (num) => {
  const minutes = Math.floor(num / 60)
  const seconds = num % 60
  const obj = {
    minute : minutes,
    second : seconds
  }
  return obj
}

const TimeConvertToHour = (num) => {
  const hour = Math.floor(num / 60)
  const minutes = num % 60
  return `${hour} Jam, ${minutes} Menit`
}

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

const AskPermissionsRecording = async () => {
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
    Buffer.from(data, 'base64')
  })
}

export { TimeConvert, TimerObj, TimeConvertToHour, AskPermissionsRecording }
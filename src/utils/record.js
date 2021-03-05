// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType
// } from 'react-native-audio-recorder-player'
// import {
//   PermissionsAndroid,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native'
// import React, { useState } from 'react'
// import { ratio, screenWidth } from './src/utils/Styles'

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#455A64',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   titleTxt: {
//     marginTop: 100 * ratio,
//     color: 'white',
//     fontSize: 28 * ratio
//   },
//   viewRecorder: {
//     marginTop: 40 * ratio,
//     width: '100%',
//     alignItems: 'center'
//   },
//   recordBtnWrapper: {
//     flexDirection: 'row'
//   },
//   viewPlayer: {
//     marginTop: 60 * ratio,
//     alignSelf: 'stretch',
//     alignItems: 'center'
//   },
//   viewBarWrapper: {
//     marginTop: 28 * ratio,
//     marginHorizontal: 28 * ratio,
//     alignSelf: 'stretch'
//   },
//   viewBar: {
//     backgroundColor: '#ccc',
//     height: 4 * ratio,
//     alignSelf: 'stretch'
//   },
//   viewBarPlay: {
//     backgroundColor: 'white',
//     height: 4 * ratio,
//     width: 0
//   },
//   playStatusTxt: {
//     marginTop: 8 * ratio,
//     color: '#ccc'
//   },
//   playBtnWrapper: {
//     flexDirection: 'row',
//     marginTop: 40 * ratio
//   },
//   btn: {
//     borderColor: 'white',
//     borderWidth: 1 * ratio
//   },
//   txt: {
//     color: 'white',
//     fontSize: 14 * ratio,
//     marginHorizontal: 8 * ratio,
//     marginVertical: 4 * ratio
//   },
//   txtRecordCounter: {
//     marginTop: 32 * ratio,
//     color: 'white',
//     fontSize: 20 * ratio,
//     textAlignVertical: 'center',
//     fontWeight: '200',
//     fontFamily: 'Helvetica Neue',
//     letterSpacing: 3
//   },
//   txtCounter: {
//     marginTop: 12 * ratio,
//     color: 'white',
//     fontSize: 20 * ratio,
//     textAlignVertical: 'center',
//     fontWeight: '200',
//     fontFamily: 'Helvetica Neue',
//     letterSpacing: 3
//   }
// })

// const Page = () => {
//   const [isLoggingIn, setLoginIn] = useState(false)
//   const [recordSecs, setRecordSecs] = useState(0)
//   const [recordTime, setRecordTime] = useState('00:00:00')
//   const [currentPositionSec, setCurrentPositionSec] = useState(0)
//   const [currentDurationSec, setCurrentDurationSec] = useState(0)
//   const [playTime, setPlayTime] = useState('00:00:00')
//   const [duration, setDuration] = useState('00:00:00')

//   const onStatusPress = (e) => {
//     const touchX = e.nativeEvent.locationX
//     console.log(`touchX: ${touchX}`)
//     const playWidth = (this.state.currentPositionSec / this.state.currentDurationSec)
//       * (screenWidth - 56 * ratio)
//     console.log(`currentPlayWidth: ${playWidth}`)

//     const currentPosition = Math.round(this.state.currentPositionSec)
//     console.log(`currentPosition: ${currentPosition}`)

//     if (playWidth && playWidth < touchX) {
//       const addSecs = Math.round(currentPosition + 1000)
//       this.audioRecorderPlayer.seekToPlayer(addSecs)
//       console.log(`addSecs: ${addSecs}`)
//     } else {
//       const subSecs = Math.round(currentPosition - 1000)
//       this.audioRecorderPlayer.seekToPlayer(subSecs)
//       console.log(`subSecs: ${subSecs}`)
//     }
//   };

//   onStartRecord = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Permissions for write access',
//             message: 'Give permission to your storage to write a file',
//             buttonPositive: 'ok'
//           },
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the storage')
//         } else {
//           console.log('permission denied')
//           return
//         }
//       } catch (err) {
//         console.warn(err)
//         return
//       }
//     }

//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           {
//             title: 'Permissions for write access',
//             message: 'Give permission to your storage to write a file',
//             buttonPositive: 'ok'
//           },
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('You can use the camera')
//         } else {
//           console.log('permission denied')
//           return
//         }
//       } catch (err) {
//         console.warn(err)
//         return
//       }
//     }
//     const path = Platform.select({
//       ios: 'hello.m4a',
//       android: 'sdcard/hello.mp4'
//     })

//     const audioSet: AudioSet = {
//       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//       AudioSourceAndroid: AudioSourceAndroidType.MIC,
//       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac
//     }
//     console.log('audioSet', audioSet)
//     const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet)
//     this.audioRecorderPlayer.addRecordBackListener((e) => {
//       setRecordSecs({
//         recordSecs: e.current_position,
//         recordTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.current_position),
//         )
//       })
//     })
//     console.log(`uri: ${uri}`)
//   }

//   onStopRecord = async () => {
//     const result = await this.audioRecorderPlayer.stopRecorder()
//     this.audioRecorderPlayer.removeRecordBackListener()
//     setRecordSecs(0)
//     console.log(result)
//   }

//   onStartPlay = async () => {
//     console.log('onStartPlay')
//     const path = Platform.select({
//       ios: 'hello.m4a',
//       android: 'sdcard/hello.mp4'
//     })
//     const msg = await this.audioRecorderPlayer.startPlayer(path)
//     this.audioRecorderPlayer.setVolume(1.0)
//     console.log(msg)
//     this.audioRecorderPlayer.addPlayBackListener((e) => {
//       if (e.current_position === e.duration) {
//         console.log('finished')
//         this.audioRecorderPlayer.stopPlayer()
//       }
//       setCurrentPositionSec({ currentPositionSec: e.duration })
//       setCurrentDurationSec({ currentDurationSec: e.duration })
//       setPlayTime({  })

//       this.setState({
//         currentPositionSec: e.current_position,
//         currentDurationSec: e.duration,
//         playTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.current_position),
//         ),
//         duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration))
//       })
//     })
//   }

//   onPausePlay = async () => {
//     await this.audioRecorderPlayer.pausePlayer()
//   }

//   onStopPlay = async () => {
//     console.log('onStopPlay')
//     this.audioRecorderPlayer.stopPlayer()
//     this.audioRecorderPlayer.removePlayBackListener()
//   }

// }

// export default Page

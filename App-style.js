import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  iconBack: {
    marginTop: 0,
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#FEF5FF',
  },
  containerHeader: {
    paddingVertical: 4,
    backgroundColor: '#77008e',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerScrollView: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  flexHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTitleWhite: {
    color: 'white',
    textTransform: 'capitalize',
    fontSize: 12,
  },
  containerSetting: {
    marginBottom: '10%',
  },
  containerTopTitle: {
    marginTop : 10,
    marginBottom : 15,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  title: {
    marginBottom : 5,
    color: 'white',
    fontSize: 15,
  },
  imgHeading: {
    width: '100%',
    height: 205,
    alignSelf : 'center',
  },
  viewParagraph: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  textParagraph: {
    lineHeight : 17,
    marginBottom : 15,
    color: 'black',
    fontSize: 12,
  },
  textTitleBold: {
    marginLeft: 8,
    color: 'white',
    fontSize: 20,
  },
  textSubtitleBold: {
    lineHeight : 17,
    marginBottom : 10,
    color: 'black',
    fontSize: 12,
  },
  textSubpoint: {
    marginLeft:15,
    lineHeight : 17,
    marginBottom : 10,
    color: 'black',
    fontSize: 12,
  },
  //
  cardCategory : {
    width : 135,
    height : 119,
    marginVertical : 15,
    marginHorizontal : 15,
  },
  textSeeMessage : {
    bottom : 25,
    color: 'white',
    position : 'absolute',
    fontSize: 12,
  },
  textCategory : {
    lineHeight : 18,
    color: 'white',
    textAlign : 'center',
    paddingHorizontal : 10,
    textTransform : 'capitalize',
    fontSize: 12,
  },
  textModal : {
    color: 'black',
    fontSize: 12,
  },
  containerCategory : {
    top : 28,
    height : 60,
    width : '75%',
    position : 'absolute',
    justifyContent : 'center',
  },
  containerTextInput: {
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent : 'center',
  },
  textInput: {
    flex : 1,
    height : 48,
    elevation : 1,
    paddingLeft: 24,
    marginLeft : 12,
    borderRadius: 28,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  containerSend: {
    width: 50,
    height: 48,
    marginTop: 0,
    marginBottom :0,
    borderRadius: 20,
    marginHorizontal : 12,
  },
  //chat card
  containerChat: {
    width: '65%',
    paddingTop: 4,
    borderWidth: 0,
    borderRadius: 20,
    paddingBottom: 16,
    marginVertical : 10,
    marginHorizontal : 20,
    backgroundColor: 'white',
  },
  containerSoundStart: {
    marginLeft : 4,
    marginRight : 20,
    marginBottom : 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerSoundEnd: {
    marginRight : 4,
    marginLeft : 20,
    marginBottom : 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textSoundDuration: {
    color: 'black',
    fontSize: 12,
  },
  avatarUser: {
    width: 36,
    height: 36,
  },
  avatarChatInstructor: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
  },
  containerUserDesc: {
    paddingLeft: 20,
    paddingRight : 15
  },
  textDesc: {
    marginTop: 2,
    color: 'black',
    fontSize: 12,
  },
  textUserDesc: {
    marginTop: 4,
    marginBottom : 10,
    lineHeight : 15,
    color: 'black',
    fontSize: 12,
  },
  textTime: {
    flex : 1,
    marginRight: 16,
    textAlign: 'right',
    color: 'black',
    fontSize: 12,
  },
  containerTime : {
    marginTop : 10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },
  notif : {
    top : 12,
    right : 12,
    position : 'absolute',
  },
  flexEnd : {
    alignSelf : 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: '#7a0090',
  },
  flexStart : {
    alignSelf : 'flex-start',
    borderTopLeftRadius: 0,
    backgroundColor : 'grey',
  },
  avatarStart: {
    flex: 1,
    alignItems: 'flex-start',
  },
  avatarEnd: {
    flex: 1,
    alignItems: 'flex-end',
  },
  containerVoice : {
    paddingTop : 15,
    paddingBottom : 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal : 20,
  },
  cancel : {
    marginLeft : '20%',
  },
  textPurple : { color : '#58006f' },
  textWhite : { color : 'white' },
  flexRow : { flexDirection : 'row' },
  horizontal : { marginHorizontal : 10 },
})

export { styles }

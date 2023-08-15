import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

const ActionMessage = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={.7}
        style={styles.btnStop}
      >
        <Text style={styles.txtAction}>
          Stop
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={.7}
        style={styles.btnRecording}
      >
        <FastImage
          style={styles.img}
          source={
            false
              ? require('../../../assets/images/recordingIcon.png')
              : require('../../../assets/gifs/voiceLoading.gif')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={.7}
        style={styles.btnClear}
      >
        <Text style={styles.txtAction}>
          Clear
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: wp(18),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    bottom: hp(2),
  },
  btnRecording: {

  },
  img: {
    width: wp(18),
    height: wp(18),
  },
  btnStop: {
    backgroundColor: '#B85757',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClear: {
    backgroundColor: '#7D7D7D',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAction: {
    color: 'white',
    fontSize: wp(4),
  },
})

export default ActionMessage
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';
import FastImage from 'react-native-fast-image';
import Voice from '@react-native-voice/voice';
import {ApiCreateChatAi} from '../../actions/Api';

const ActionMessage = () => {
  const [isCording, setCoding] = useState(false);
  const [resultSpeech, setResultSpeech] = useState(null);

  useEffect(() => {
    checkPermission();
    fetchApiCreateChatAi();

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSpeechStartHandler = error => {
    console.log('onSpeechStartHandler');
  };

  const onSpeechEndHandler = e => {
    setCoding(false);
    console.log('onSpeechEndHandler');
  };

  const onSpeechResultsHandler = e => {
    console.log('onSpeechResultsHandler', e);
    setResultSpeech(e?.value[0]);
  };

  const onSpeechErrorHandler = e => {
    setCoding(false);
    console.log('onSpeechErrorHandler', e);
  };

  const startRecording = async () => {
    setCoding(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Start Recording Error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setCoding(false);
      fetchApiCreateChatAi();
    } catch (error) {
      console.log('Stop Recording Error', error);
    }
  };

  const fetchApiCreateChatAi = async () => {
    try {
      let response = await ApiCreateChatAi();
      console.log('response', JSON.stringify(response));
    } catch (error) {
      console.log('fetchApiCreateChatAi.error', error);
    }
  };

  const handleConfirm = () => {
    openSettings();
  };

  const handleOpenSetting = () => {
    Alert.alert('Warning', 'Confirm permission to use the microphone!!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleConfirm()},
    ]);
  };

  const handleRecheckPermission = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    ).then(result => {
      if (result === RESULTS.GRANTED) {
        // handleGetGeoLocation();
      } else {
        handleOpenSetting();
      }
    });
  };

  const checkPermission = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            // handleGetGeoLocation();
            break;
          case RESULTS.UNAVAILABLE:
          case RESULTS.DENIED:
          case RESULTS.LIMITED:
            handleRecheckPermission();
            break;
          case RESULTS.BLOCKED:
            handleOpenSetting();
            break;
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.btnStop}>
        <Text style={styles.txtAction}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnRecording}
        onPress={isCording ? stopRecording : startRecording}>
        <FastImage
          style={styles.img}
          source={
            isCording
              ? require('../../../assets/gifs/voiceLoading.gif')
              : require('../../../assets/images/recordingIcon.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.btnClear}>
        <Text style={styles.txtAction}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp(18),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    bottom: hp(2),
  },
  btnRecording: {},
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
});

export default ActionMessage;

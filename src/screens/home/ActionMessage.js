import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {observer} from 'mobx-react';
import FastImage from 'react-native-fast-image';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

import {useStores} from '../../context';

const ActionMessage = () => {
  const {
    chatStore: {isLoading, messages, fetchApiGlobalChatAi},
  } = useStores();

  const [isCording, setCoding] = useState(false);
  const [isSpeak, setSpeak] = useState(false);
  const [resultSpeech, setResultSpeech] = useState(null);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-progress', event =>
      console.log('progress', event),
    );
    Tts.addEventListener('tts-finish', event => console.log('finish', event));
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
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

  const onSpeechErrorHandler = error => {
    setCoding(false);
    console.log('onSpeechErrorHandler', error);
  };

  const startRecording = async () => {
    handleStopSpeak();
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
      if (resultSpeech?.trim()?.length > 0) {
        fetchApiGlobalChatAi(resultSpeech?.trim());
        setResultSpeech(null);
        startTts();
      }
    } catch (error) {
      console.log('Stop Recording Error', error);
    }
  };

  const startTts = () => {
    if (!isLoading) {
      let content = messages[messages?.length - 1]?.content;
      if (content && !content?.includes('https')) {
        if (Platform.OS === 'ios') {
          Tts.speak(content, {
            iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
            rate: 0.5,
          });
        } else {
          Tts.speak(content, {
            androidParams: {
              KEY_PARAM_PAN: 1,
              KEY_PARAM_VOLUME: 2,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
        }
      }
    }
  };

  const handleStopSpeak = () => {
    Tts.stop();
    setSpeak(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!isSpeak}
        activeOpacity={0.7}
        style={[styles.btnStop, !isSpeak && styles.btnEmpty]}
        onPress={handleStopSpeak}>
        <Text style={styles.txtAction}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isLoading}
        activeOpacity={0.7}
        style={styles.btnRecording}
        onPress={isCording ? stopRecording : startRecording}>
        <FastImage
          style={styles.img}
          source={
            isLoading
              ? require('../../../assets/gifs/loading.gif')
              : isCording
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
    backgroundColor: '#ff3333',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEmpty: {
    backgroundColor: 'white',
  },
  btnClear: {
    backgroundColor: '#7D7D7D',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwEmpty: {
    backgroundColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
  },
  txtAction: {
    color: 'white',
    fontSize: wp(4),
  },
});

export default observer(ActionMessage);

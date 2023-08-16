import React from 'react';
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

const IntroScreen = ({navigation}) => {
  const handleNav = () => {
    navigation.navigate('HomeScreen');
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
        handleNav();
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
            handleNav();
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
      <View style={styles.vwHeader}>
        <Text style={styles.txtName}>VTD</Text>
        <Text style={styles.txtDes}>The future is here, powerd by AI.</Text>
      </View>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          z
          source={require('../../../assets/gifs/ai-voice-generator.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={checkPermission}
        activeOpacity={0.7}>
        <Text style={styles.txtBtn}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  vwHeader: {
    marginTop: hp(1),
  },
  txtName: {
    fontSize: wp(16),
    fontWeight: '700',
    color: '#353D47',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  txtDes: {
    fontWeight: '500',
    color: '#818181',
    textAlign: 'center',
  },
  vwImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: wp(70),
    height: wp(70),
  },
  btn: {
    width: wp('70%'),
    backgroundColor: '#6B60FF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: hp(1.5),
  },
  txtBtn: {
    color: 'white',
    fontWeight: '700',
  },
});

export default IntroScreen;

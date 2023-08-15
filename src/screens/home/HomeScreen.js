import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import Message from './Message';
import ActionMessage from './ActionMessage';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          source={require('../../../assets/images/ai-voice-generator.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Message />
      <ActionMessage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  vwImg: {
    marginTop: hp(2),
    marginBottom: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: wp(25),
    height: wp(25),
  },
});

export default HomeScreen;

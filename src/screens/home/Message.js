import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {observer} from 'mobx-react';

import {useStores} from '../../context';
import FastImage from 'react-native-fast-image';

const Message = () => {
  const {
    chatStore: {messages},
  } = useStores();

  const keyExtractor = (_, index) => index?.toString();

  const renderItem = ({item}) => {
    let isUser = item?.role === 'user';
    return (
      <View style={[styles.card, isUser ? styles.cardUser : styles.cardAi]}>
        {item.content.includes('https') ? (
          <FastImage
            style={styles.img}
            source={{
              uri: item,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Text>{item?.content || ''}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          inverted
          data={messages || []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.flStyle}
          contentContainerStyle={styles.ccStyle}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: wp(8),
    marginBottom: hp(4),
  },
  content: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    borderRadius: wp(5),
  },
  flStyle: {
    flex: 1,
    padding: wp(3),
  },
  ccStyle: {
    paddingBottom: hp(5),
  },
  card: {
    marginBottom: hp(2),
    padding: wp(2),
  },
  cardUser: {
    backgroundColor: '#FEFEFE',
    alignSelf: 'flex-end',
    maxWidth: wp('65%'),
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    borderBottomLeftRadius: wp(2),
  },
  cardAi: {
    backgroundColor: '#D3F8E6',
    maxWidth: wp('65%'),
    alignSelf: 'flex-start',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
  },
  img: {
    height: wp(60),
    width: wp(60),
  },
});

export default observer(Message);

import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Message = () => {
  const keyExtractor = (_, index) => index?.toString();

  const renderItem = ({item, index}) => {
    let condition = index % 2 === 0;
    return (
      <View style={[styles.card, condition ? styles.cardUser : styles.cardAi]}>
        <Text>{''}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          inverted
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
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
});

export default Message;

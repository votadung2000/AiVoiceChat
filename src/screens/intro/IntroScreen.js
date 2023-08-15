import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

const IntroScreen = ({ navigation }) => {
    const handleNav = () => {
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={styles.container}>
            <View style={styles.vwHeader}>
                <Text style={styles.txtName}>
                    VTD
                </Text>
                <Text style={styles.txtDes}>
                    The future is here, powerd by AI.
                </Text>
            </View>
            <View style={styles.vwImg}>
                <FastImage
                    style={styles.img} z
                    source={require('../../../assets/gifs/ai-voice-generator.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={handleNav}
                activeOpacity={.7}
            >
                <Text style={styles.txtBtn}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around'
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
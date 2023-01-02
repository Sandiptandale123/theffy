import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, SafeAreaView, Dimensions } from 'react-native';
import colors from '../../utils/colors';
const windowWidth = Dimensions.get('window').width;

const Loader = (props) => {
    const { navigation, subjectName } = props;
    return (

        <View style={styles.overlayView}>
            {/* <ActivityIndicator style={{fontSize:100}} size="large" color={colors.redColor} /> */}

            <ActivityIndicator style={{ fontSize: 100 }} size="large" color={colors.redColor} />
            {/* <Text style={styles.textColor}>Please Wait</Text> */}
            {/* <Text style={styles.Coto}>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse  </Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    overlayView: {
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0.7,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    textColor: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: colors.black
    },
    Coto: {
        fontSize: 14,
        marginTop: 3,
        // fontWeight: 'bold',
        color: colors.black,
        // letterSpacing:0.5,
        textAlign: 'center'
    }
});
export default Loader;
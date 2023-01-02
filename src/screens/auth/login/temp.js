
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, SafeAreaView, Button, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { connect } from 'react-redux';
import colors from '../../utils/colors';


const SplashScreenPage = (props) => {
    const { navigation } = props;
    const [text, onChangeText] = React.useState("123456789");
    const [number, onChangeNumber] = React.useState(null);
    useEffect(() => {
        setTimeout(() => {
            console.log(props.userInfo, 'props.userInfoprops.userInfoprops.userInfo')
            if (props.userInfo) {
                // navigation.navigate('Drawer');
            } else {
                // navigation.navigate('GetStarted');

            }
        }, 3000)
    }, []);

    return (
        <>
{/* 

            <SafeAreaView style={styles.safearea}>
                <View style={styles.container}>
                    <View style={styles.containerImageView}>


                        <Image resizeMode={'contain'}
                            style={styles.imageView}
                            source={require('../../assets/google.png')}
                        />
                        <Text style={styles.titleText}>Welcome To Theffy</Text>
                        <Text style={styles.titleSubText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</Text>
                    </View>
                    <View style={[styles.containerImageView, { backgroundColor: '#fff' }]}>
                        <Text style={styles.titleSignUp}>SIGNUP NOW</Text>


                    </View>
                    <View style={styles.mobileView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="+91123456789"
                            keyboardType="numeric"
                        />
                        <Text style={styles.titleSendOtp}>SEND OTP</Text>
                    </View>
                    <View style={[styles.containerImageView, { backgroundColor: '#fff' }]}>
                        <Text style={styles.titleSignUp}>OR</Text>


                    </View>
                    <View style={styles.mobileView1}>
                        <Image resizeMode={'contain'}
                            style={styles.imageView2}
                            source={require('../../assets/google.png')}
                        />
                        <Image resizeMode={'contain'}
                            style={styles.imageView2}
                            source={require('../../assets/google.png')}
                        />
                    </View>
                    <View style={[styles.containerImageView, { backgroundColor: '#fff' }]}>
                        <Text style={styles.titleSignUp}>I'll Signup Later SKIP For Now </Text>


                    </View>

                </View>
            </SafeAreaView> */}

            <SafeAreaView style={styles.safearea}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 300, height: 70, resizeMode: 'stretch', }}
                        source={require('../../assets/theffyImage.png')}
                    />
                </View>
            </SafeAreaView>

        </>

    )
}
const styles = StyleSheet.create({
    safearea: {
        flex: 1
    },
    input: {
        height: 40,
        width: '60%',
        margin: 12,
        borderWidth: 1,
    },
    containerImageView: {
        backgroundColor: '#ebf3f9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageView: {
        width: '100%', height: 250, margin: 10
    },
    imageView2: {
        width: '30%', height: 100, margin: 10
    },
    titleText: { fontWeight: 'bold', fontSize: 32, color: '#69c4ff' },
    titleSubText: { color: '#101010', fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10, justifyContent: 'center', textAlign: 'justify', fontSize: 14 },
    titleSignUp: { color: '#ABC1D2', fontWeight: 'bold', fontSize: 18, justifyContent: 'center', textAlign: 'center', },
    titleSendOtp: { color: '#fff', fontSize: 16, width: '30%', textAlign: 'center', backgroundColor: '#69c4ff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10 },
    mobileView: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 },
    mobileView1: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    skip_btn: {
        borderWidth: 1,
        borderColor: "lightgray",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 40,
        fontSize: 12,
        color: '#848484'
    },
    appButtonContainer: {
        elevation: 2,
        backgroundColor: colors.gold,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})
function mapStateToProps(state) {
    return {
        userInfo: state.userData
    }
}
export default connect(mapStateToProps)(SplashScreenPage);
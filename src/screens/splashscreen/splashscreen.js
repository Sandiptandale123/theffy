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
            console.log(props, 'props')
            if (props.userInfo) {
                navigation.navigate('Drawer');

            } else {
                // navigation.navigate('Login');
                navigation.navigate('GetStarted');


            }
        }, 3000)
    }, []);

    return (
        <>
            <SafeAreaView style={styles.safearea}>
                <View style={styles.container}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'cover', }}
                        source={require('../../assets/Splash.png')}
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
    container: {
        flex: 1,
        backgroundColor: 'white',

    },


})
function mapStateToProps(state) {
    return {
        userInfo: state.userData
    }
}
export default connect(mapStateToProps)(SplashScreenPage);
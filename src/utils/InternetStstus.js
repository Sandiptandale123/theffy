import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { View, Text, StyleSheet } from 'react-native';
import { internetStstusAction } from '../reduxManager';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors'

const InternetStatus = (props) => {
    const [isConnected2, SetisConnected] = useState(false);
    const [modalVisible, SetmodalVisible] = useState(true);

    useEffect(() => {
        //Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
            SetisConnected(state.isInternetReachable);
            props.connectionStatus(state.isInternetReachable);
            global.isConnected = (state.isInternetReachable);
            showModal(state.isInternetReachable);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const showModal = (isConnectedState) => {
        //  const internetData  = props.internetConnection;
        //  internetData.internetConnection
        if (!isConnectedState) {
            SetmodalVisible(true);
            // setTimeout(() => {
            //       SetmodalVisible(false);
            //   }, 5000);
        }
        else {
            SetmodalVisible(false);
        }
    }

    return (
        <View style={modalVisible ? styles.box : { display: 'none' }}>
            <Ionicons name="wifi-off" size={28} color='black' /></View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        connectionStatus: (connectProps) => {
            dispatch(internetStstusAction(connectProps))
            return Promise.resolve();
        }
    }
}

function mapStateToProps(state) {
    return {
        internetConnection: state.ReducerInternetStatus,
        isLoading: state.isLoading,
        error: state.error
    }
}
const styles = StyleSheet.create({
    box: {
        backgroundColor: '#d1d1d1',
        opacity: 0.9,
        position: 'absolute',
        height: 30, width: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '44%',
        marginRight: '44%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 0
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(InternetStatus);

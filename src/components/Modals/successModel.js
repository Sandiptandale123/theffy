
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Button, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../utils/colors';

import Icon from 'react-native-vector-icons/Ionicons';


const SuccessModal = (props) => {
    const { showModal, closeModal, content = "Success" } = props

    return (

        <Modal isVisible={showModal} animationType="fade" transparent={true}>
            <View style={styles.container} >
                {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 10 }}>
                    <TouchableOpacity onPress={closeModal} >
                        <Icon name="ios-checkmark-outline" size={40} color={'red'} />
                    </TouchableOpacity>
                </View> */}
                <View
                    style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >

                    <View style={{ margin: 20,flexDirection:'row',alignItems:'center' }}>
                        <Icon name="ios-checkmark-circle" size={40} color={'green'} />
                        <Text style={{ color: colors.black, fontSize: 20, fontWeight: 'bold', color: 'green', textAlign: 'center',marginLeft:10 }}>{content}</Text>

                    </View>

                    <View style={{ flexDirection: 'row' }}>

                    </View>
                </View>

            </View>
        </Modal>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', borderRadius: 20,
        height: 210,

    }
});

export default SuccessModal;
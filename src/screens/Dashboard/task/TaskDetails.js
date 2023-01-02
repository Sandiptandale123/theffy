import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, SafeAreaView, Button, FlatList, Image, ScrollView, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from "../../../utils/Api";
import { SvgXml, SvgUri } from "react-native-svg";
import svgImages from '../../../components/svg/allSvg';
import { Radio, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const TaskDetails = (props) => {
    const { navigation } = props;
    return (
        <ScrollView style={styles.mainView}>
            <View >
                <View style={styles.tabView}>
                    <TouchableOpacity style={[styles.touchView, { backgroundColor: '#69c4ff' }]}><Text style={styles.touchText}><Icon name="ios-eye" size={20} style={{ alignItems: 'center' }} />Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.touchView, { backgroundColor: '#102283' }]}><Text style={styles.touchText}><Icon name="ios-eye" size={20} style={{ alignItems: 'center' }} />View offers</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.touchView, { backgroundColor: '#ff9800' }]}><Text style={styles.touchText}>Post As Premium</Text></TouchableOpacity>
                </View>


                <View style={styles.subView}>
                    <View style={styles.typeView}>

                        <Text style={[styles.textTitle, { color: '#69c4ff' }]}>2 Bed Room Hall Kitchen Cleaning</Text>
                    </View>
                    <Text style={styles.textTitle}>$ 100</Text>
                </View>
                <Text style={[styles.subTextView, { marginHorizontal: 5 }]}>I’m looking for an entrepreneur willing to work as a drop shipping assistant alongside the owner...<Text style={[styles.subTextView, { color: '#69c4ff' }]}>Read More</Text></Text>

                <Text style={[styles.textTitle, { marginHorizontal: 5 }]}>Contact Details</Text>
                <View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-eye" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>Anna Watson</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-locate" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>Tornado, Canada</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-call" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>+91 9623237XXX</Text>
                    </View>
                </View>
                <Text style={[styles.textTitle, { marginHorizontal: 5 }]}>Job Details</Text>
                <View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-eye" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>Tue, 1 Dec 2020</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-locate" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>1:00 AM</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-call" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>Remotely</Text>
                    </View>
                </View>
                <Text style={[styles.textTitle, { marginHorizontal: 5 }]}>Photo</Text>
                <View style={styles.imageMainView}>
                    <Image
                        resizeMode='contain'
                        style={styles.imageView}
                        source={require("../../../assets/theffyImage.png")}
                    />
                    <Image
                        resizeMode='contain'
                        style={styles.imageView}
                        source={require("../../../assets/theffyImage.png")}
                    />
                    <Image
                        resizeMode='contain'
                        style={styles.imageView}
                        source={require("../../../assets/theffyImage.png")}
                    />
                </View>
                <Text style={styles.taskCancelText}>Cancle Task</Text>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainView: { backgroundColor: '#ffffff', flex: 1 },
    textView: { fontSize: 20, fontWeight: 'bold', margin: 5 },
    subView: { justifyContent: 'space-between', flex: 1, flexDirection: 'row', margin: 10 },
    typeView: { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', },
    subTextView: { margin: 5, },
    textTitle: { fontSize: 16, fontWeight: 'bold', color: '#617b9f', },
    tabView: { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', },
    touchView: { borderRadius: 15, margin: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal:10,paddingVertical:5 },
    touchText: { color: '#fff', fontSize: 16, fontWeight: 'bold', padding: 5, textAlign: 'center' },
    imageView: { width: 100, height: 100, margin: 10, },
    imageMainView: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: 1, },
    taskCancelText:{justifyContent:'center',padding:10,backgroundColor:'#e51c23',color:'#fff',textAlign:'center',fontSize:20,borderRadius:10,flex:1,marginHorizontal:'20%',marginVertical:10}
})
export default TaskDetails;
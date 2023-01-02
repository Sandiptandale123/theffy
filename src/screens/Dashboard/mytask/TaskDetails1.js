import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, SafeAreaView, Button, FlatList, Image, ScrollView, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from "../../../utils/Api";
import { SvgXml, SvgUri } from "react-native-svg";
import svgImages from '../../../components/svg/allSvg';
import { Radio, CheckBox, Item } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import GlobalConstants from '../../../utils/Constants';
import { connect } from 'react-redux';
const TaskDetails1 = (props) => {
    const { navigation, userInfo } = props;
    const { item, pageName } = navigation.state.params
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    return (
        <ScrollView style={styles.mainView}>
            <View >
                <View style={styles.tabView}>
                    {/* {props.userInfo && props.userInfo.post_task == "yes" && <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity style={[styles.touchView, { backgroundColor: '#69c4ff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}>

                        <Text style={styles.touchText}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                    </View>} */}

                    {props.userInfo && props.userInfo.post_task == "yes" && item.user_id === props.userInfo.id && <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}><TouchableOpacity style={[styles.touchView, { backgroundColor: '#69c4ff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}

                        onPress={() => {
                            navigation.navigate('PostTask1', { "isEdit": true });
                            // navigation.navigate("MakeOffer", { postItem: item, userInfo: userInfo });
                        }}
                    >

                        <Text style={styles.touchText}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                    </View>}

                    {props.userInfo && props.userInfo.post_task == "yes" && item.user_id !== props.userInfo.id && <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}><TouchableOpacity style={[styles.touchView, { backgroundColor: '#69c4ff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}

                        onPress={() => {
                            navigation.navigate("MakeOffer", { postItem: item, userInfo: userInfo });
                        }}
                    >

                        <Text style={styles.touchText}>
                            Make Offer
                        </Text>
                    </TouchableOpacity>
                    </View>}
                    {userInfo && userInfo.post_task == "yes" && <View style={{ flex: 1, }}><TouchableOpacity onPress={() => {
                        navigation.navigate("chatHome");
                    }} style={[styles.touchView, { backgroundColor: '#102283', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}>

                        <Text style={styles.touchText}>
                            View Offers
                        </Text>
                    </TouchableOpacity>
                    </View>
                    }
                    {/* <TouchableOpacity style={[styles.touchView, { backgroundColor: '#ff9800' }]}><Text style={styles.touchText}>Post As Premium</Text></TouchableOpacity> */}
                </View>


                <View style={styles.subView}>
                    <View style={styles.typeView}>
                    <Text style={[styles.textTitle,{marginRight:10}]}>Task Name:</Text>
                        <Text style={[styles.textTitle, { color: '#69c4ff' }]}>{item.title}</Text>
                    </View>
                    <Text style={styles.textTitle}>$ {item.totalamt}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'column', marginVertical: 5 }}>
                        <Text style={[styles.textTitle,]}>Categories:</Text>
                        <Text>{item.category_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginVertical: 5 }}>
                        <Text style={[styles.textTitle,]}>Tags:</Text>
                        <Text>{item.category_name}</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }}>


                    <Text style={[styles.textTitle,]}>Description:</Text>
                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 2}
                        style={{ lineHeight: 21, fontSize: 12 }}>{item.descp}</Text>

                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={{ lineHeight: 21, marginTop: 10, fontSize: 14, color: '#69c4ff' }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                            : null
                    }

                    {/* <Text>{item.descp}</Text> */}

                </View>

                <Text style={[styles.textTitle, { marginHorizontal: 5, marginVertical: 10 }]}>Contact Details</Text>
                <View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-eye" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>No Name</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-locate" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>{item.location}</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-call" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>{item.mobile}</Text>
                    </View>
                </View>
                <Text style={[styles.textTitle, { marginHorizontal: 5, marginVertical: 10 }]}>Job Details</Text>
                <View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-calendar" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>{item.date}</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-locate" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>{item.time}</Text>
                    </View>
                    <View style={[styles.subView, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon name="ios-call" size={20} style={{ alignItems: 'center' }} />
                        <Text style={[styles.textTitle, { marginHorizontal: 5, fontWeight: 'normal' }]}>{item.mobile ? item.mobile : "Not Available"}</Text>
                    </View>
                </View>
                <Text style={[styles.textTitle, { marginHorizontal: 5, marginVertical: 10 }]}>Photo's</Text>
                <View style={styles.imageMainView}>
                    <Image
                        resizeMode='contain'
                        style={styles.imageView}
                        source={{ uri: GlobalConstants.imageBaseUrl1 + item.file }}
                    />


                </View>
                {/* <Text style={styles.taskCancelText}>Cancle Task</Text>s */}
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainView: { backgroundColor: '#ffffff', flex: 1 },
    textView: { fontSize: 20, fontWeight: 'bold', margin: 5 },
    subView: { justifyContent: 'space-between', flex: 1, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 },
    typeView: { justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', },
    subTextView: { margin: 5, },
    textTitle: { fontSize: 12, fontWeight: 'bold', color: '#617b9f', },
    tabView: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', },
    touchView: { borderRadius: 10, margin: 5, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5, flex: 1, alignItems: 'center' },
    touchText: { color: '#fff', fontSize: 14, fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', flex: 1, alignItems: 'center' },
    imageView: { width: 100, height: 100, margin: 10, },
    imageMainView: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: 1, },
    taskCancelText: { justifyContent: 'center', padding: 10, backgroundColor: '#e51c23', color: '#fff', textAlign: 'center', fontSize: 20, borderRadius: 10, flex: 1, marginHorizontal: '20%', marginVertical: 10 }
});



function mapStateToProps(state) {
    return {
        userInfo: state.userData
    }
}
export default connect(mapStateToProps)(TaskDetails1);



// export default TaskDetails1;
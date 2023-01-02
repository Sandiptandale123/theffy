import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, SafeAreaView, Button, FlatList, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from '../../../utils/Api';
import Loader from '../../../components/Loader/Loader';

import GlobalConstants from '../../../utils/Constants';

import Icon from 'react-native-vector-icons/Ionicons';
import { back } from 'react-native/Libraries/Animated/Easing';
import { connect } from 'react-redux';
import { TaskAction } from '../../../reduxManager';

const MyTask = (props) => {
    const { userInfo } = props;
    const { navigation } = props;

    const [url, setUrl] = useState('get_ActivePostByUser');
    const [featureListIndex, setFeatureListIndex] = useState(500);
    const [showLoader, setLoader] = useState(false);
    const [taskData, setTaskData] = useState('')


    useEffect(() => {
        setLoader(true);
        getTask(6);

    }, [url]);

    let TaskList =
        [
            {
                taskName: '2 Bed Room Hall Kitchen Cleaning',
                taskWorkType: 'Sufboard repair',
                type: 'Remote',
                taskDate: 'Tue, 3 Nov',
                taskPrice: '$ 70',
                taskImage: require('../../../assets/theffyImage.png')

            },

            {
                taskName: '2 Bed Room Hall Kitchen Cleaning',
                taskWorkType: 'Sufboard repair',
                type: 'Remote',
                taskDate: 'Tue, 3 Nov',
                taskPrice: '$ 70',
                taskImage: require('../../../assets/banner.png')

            },

            {
                taskName: '2 Bed Room Hall Kitchen Cleaning',
                taskWorkType: 'Sufboard repair',
                type: 'In-Progress',
                taskDate: 'Tue, 3 Nov',
                taskPrice: '$ 70',
                taskImage: require('../../../assets/facebook.png')

            },
            {
                taskName: '2 Bed Room Hall Kitchen Cleaning',
                taskWorkType: 'Sufboard repair',
                type: 'Remote',
                taskDate: 'Tue, 3 Nov',
                taskPrice: '$ 70',
                taskImage: require('../../../assets/google.png')
            },

        ];


    const getTask = id => {
        const formData = new FormData();
        formData.append('limit', featureListIndex);
        formData.append('offset', 0);
        formData.append('user_id', userInfo && userInfo.id);
        Api.postApi(formData, url)
            .then(response => {
                console.log(response, 'get_taskby_id');

                if (response.status === 200) {
                    if (id === 6) {
                        setTaskData(response.data.data);

                        setLoader(false);
                    }
                }
            })
            .catch(error => {
                // setLoader(false);
                console.log(error, 'error');
                setLoader(false);
            });
    };







    const renderTaskItem = ({ item, index }) => {
         console.log(JSON.stringify(taskData), "item")
        let bgcolors = [
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
        ];
        return (

            <TouchableOpacity onPress={() => {
                TaskAction.setTaskDetails(item);
                navigation.navigate("TaskDetails1", { item: item, pageName: "MyTask" })
                console.log(item, "DataFrom task details")

            }} >
                <View style={{ backgroundColor: bgcolors[index], marginVertical: 10, padding: 10, borderRadius: 6 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', height: 150 }}>

                        <View style={{ width: 100, height: '100%', }}>
                            <Image
                                style={{ width: 100, height: '100%', resizeMode: 'contain', padding: 5 }}
                                source={{uri:GlobalConstants.imageBaseUrl1+item.file}}
                                //source={{ uri: GlobalConstants.imageBaseUrl + '1624108140about02.jpg' }}

                            />
                        </View>
                        <View style={{ flexDirection: 'column', height: '100%', marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        style={{ padding: 2 }}
                                        name="ios-man"
                                        size={20}
                                        color="#4c6992"
                                    />
                                    <Text style={[styles.textView1,]}>{item.category_name}</Text>
                                </View>

                                <Text style={[styles.textView1, { fontWeight: 'bold' }]}>{item.totalamt}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    style={{ padding: 2 }}
                                    name="ios-navigate"
                                    size={20}
                                    color="#4c6992"
                                />
                                <Text style={[styles.textView1,]}>{item.location}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    style={{ padding: 2 }}
                                    name="ios-calendar"
                                    size={20}
                                    color="#4c6992"
                                />
                                <Text style={[styles.textView1]}>{item.date}</Text>
                            </View>


                            <View style={[styles.subView2, { backgroundColor: 'transparent' }]}>
                                <View style={[styles.touchableView2, { backgroundColor: '#72c2e7' }]}>
                                    <Text style={styles.textView}>Book Post</Text>
                                </View>
                                <View style={[styles.touchableView2, { backgroundColor: '#eb4046' }]}>
                                    <Text style={styles.textView}>Cancel</Text>
                                </View>
                                <View style={[styles.touchableView2, { backgroundColor: '#fe9d2b' }]}>
                                    <Text style={styles.textView}>Offers</Text>
                                </View>


                            </View>
                        </View>



                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <>
            {showLoader ? <Loader /> :
                <>
                    <StatusBar barStyle="dark-content" />
                    <SafeAreaView style={styles.safearea}>

                        {/* <ScrollView style={styles.mainView}> */}
                        <View style={styles.subView}>
                            <ScrollView style={styles.scrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >

                                <TouchableOpacity
                                    onPress={() => {
                                        setUrl('get_ActivePostByUser');
                                    }}
                                    style={url == 'get_ActivePostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                                    <Text style={url == 'get_ActivePostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Active'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUrl('get_InprogressPostByUser');

                                    }}
                                    style={url == 'get_InprogressPostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                                    <Text style={url == 'get_InprogressPostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'In-Progress'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUrl('get_CompletePostByUser');

                                    }}
                                    style={url == 'get_CompletePostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                                    <Text style={url == 'get_CompletePostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Completed'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUrl('get_ExpiredPostByUser');

                                    }}
                                    style={url == 'get_ExpiredPostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                                    <Text style={url == 'get_ExpiredPostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Expired'}</Text>
                                </TouchableOpacity>


                                {/* <TouchableOpacity style={[styles.touchableOpacity, { backgroundColor: 'blue'}]} >
                        <View style={[styles.touchableView, { backgroundColor: '#72c2e7' }]}>
                            <Text style={[styles.textView,{ fontWeight:"700",}]}>Active</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.touchableOpacity, { backgroundColor: 'blue'}]} >
                        <View style={[styles.touchableView, { backgroundColor: '#ccefff' }]}>
                            <Text style={styles.textView}>In-Progress</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.touchableOpacity, { backgroundColor: 'blue'}]} >
                        <View style={[styles.touchableView, { backgroundColor: '#ccefff' }]}>
                            <Text style={styles.textView}>Completed</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.touchableOpacity, { backgroundColor: 'blue'}]} >
                        <View style={[styles.touchableView, { backgroundColor: '#ccefff' }]}>
                            <Text style={styles.textView}>Expired</Text>
                        </View>
                        </TouchableOpacity> */}
                            </ScrollView>
                        </View>
                        <View style={{ backgroundColor: '#ffffff',marginBottom:100 }}>

                            {taskData && taskData.length ? <FlatList
                                data={taskData}
                                renderItem={renderTaskItem}
                                showsHorizontalScrollIndicator={false}
                                key={(taskData)}
                                style={{ marginHorizontal: 10 }}
                                keyExtractor={(item, index) => index + "id"}
                            /> :

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>No Task Found</Text>
                                </View>
                            }


                        </View>
                        {/* </ScrollView> */}
                    </SafeAreaView>
                </>
            }</>
    )


}
const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: '#ffffff' },
    mainView: { flex: 1 },
    subView: { flexDirection: 'row', justifyContent: 'space-between', height: 100, alignItems: 'center', },
    touchableOpacity: { justifyContent: 'center' },
    touchableView: { justifyContent: 'space-between', alignItems: 'center', flex: 1, margin: 5, paddingHorizontal: 5, paddingVertical: 10 },
    subView2: { flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center', },
    touchableView2: { justifyContent: 'space-between', alignItems: 'center', margin: 5, paddingHorizontal: 5, paddingVertical: 5, },
    textView: { justifyContent: 'center', textAlign: 'center', color: "black" },
    textView1: { justifyContent: 'center', textAlign: 'center', marginLeft: 10 },
    appButtonContainer: {
        // elevation: 2,
        // width: '100%',
        // backgroundColor: '#69c4ff',
        // borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        borderRadius: 5,
        //flex: 1
    },
    appButtonText: {
        fontSize: 14,
        color: '#fff',
        padding: 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
});


function mapStateToProps(state) {
    return {
        userInfo: state.userData
    }
}
export default connect(mapStateToProps)(MyTask);
// export default MyTask;
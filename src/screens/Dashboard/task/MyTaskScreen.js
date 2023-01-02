import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, SafeAreaView, Button, FlatList, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Ionicons';
import { back } from 'react-native/Libraries/Animated/Easing';
import Api from "../../../utils/Api";
const MyTaskScreen = () => {
    const [getpostPackageList, setPostPackageList] = useState([])
    const [showErorMsg, setErrorMsg] = useState("");
    const [showLoader, setLoader] = useState(false);
    useEffect(() => {
        getPostByPackges()
    }, [])




    const getPostByPackges = () => {
        debugger;
        setErrorMsg("");


        setLoader(true);

        const formData = new FormData();
        formData.append("limit", 10);
        formData.append("offset", 0);
        formData.append("package_id", 1);
        debugger;



        return new Promise((resolve, reject) => {
            Api.postApi(formData, "get_postby_packages")
                .then((response) => {
                    console.log(response, "get_postby_packagesget_postby_packages");
                    if (response.status === 200) {
                        if (response.data.error === 'true') {
                            alert(response.data.message)
                            return
                        }
                        setPostPackageList(response.data.data)
                    }
                    resolve(response);
                })
                .catch((error) => {
                    setLoader(false);
                    console.log(error.response.data, "login error.response.data");
                    console.log(error.response.status, "status.response.dastatusta");
                    if (error.response.data) {
                        setErrorMsg(error.response.data.message);
                    }
                });
        });
    }


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

    const renderTaskItem = ({ item, index }) => {
        console.log(item, "item")
        let bgcolors = [
            '#e9f7fe',
            '#efffdd',
            '#ffe4d0',
            '#ffdadb',
        ];
        return (
            <View style={{ backgroundColor: bgcolors[index], marginVertical: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row', height: 150 }}>

                    <View style={{ width: 100, height: '100%', }}>
                        {item.file ? <Image
                            style={{ width: 100, height: '100%', resizeMode: 'contain', padding: 5 }}
                            source={{
                                uri: 'https://theffy.com/newtheffy/assets/upload/' + item.file,
                            }}
                        /> : <Image
                            style={{ width: 100, height: '100%', resizeMode: 'contain', padding: 5 }}
                            source={require('../../../assets/logo.png')}
                        />}
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

                            <Text style={[styles.textView1, { fontWeight: 'bold' }]}>$ {item.price}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                style={{ padding: 2 }}
                                name="ios-locate"
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
        )
    }
    return (

        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safearea}>

                <ScrollView style={styles.mainView}>
                    <View style={styles.subView}>
                        <View style={[styles.touchableView, { backgroundColor: '#72c2e7' }]}>
                            <Text style={styles.textView}>Active</Text>
                        </View>
                        <View style={[styles.touchableView, { backgroundColor: '#ccefff' }]}>
                            <Text style={styles.textView}>In-Progress</Text>
                        </View>
                        <View style={[styles.touchableView, { backgroundColor: '#ccefff' }]}>
                            <Text style={styles.textView}>Completed</Text>
                        </View>
                        <View style={[styles.touchableView, { backgroundColor: '#ccefff' }]}>
                            <Text style={styles.textView}>Expired</Text>
                        </View>

                    </View>
                    <View style={{ backgroundColor: '#ffffff' }}>

                        <FlatList
                            data={getpostPackageList}
                            renderItem={renderTaskItem}
                            showsHorizontalScrollIndicator={false}
                            key={(getpostPackageList)}
                            showsHorizontalScrollIndicator={false}
                            key={(getpostPackageList)}
                            style={{ marginHorizontal: 10 }}
                            keyExtractor={(item, index) => index + "id"}
                        />


                    </View>
                </ScrollView>
            </SafeAreaView>
        </>

    )


}
const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: '#ffffff' },
    mainView: { flex: 1 },
    subView: { flexDirection: 'row', justifyContent: 'space-between', height: 100, alignItems: 'center', },
    touchableView: { justifyContent: 'space-between', alignItems: 'center', flex: 1, margin: 5, paddingHorizontal: 5, paddingVertical: 10 },
    subView2: { flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center', },
    touchableView2: { justifyContent: 'space-between', alignItems: 'center', margin: 5, paddingHorizontal: 5, paddingVertical: 5, },
    textView: { justifyContent: 'center', textAlign: 'center', },
    textView1: { justifyContent: 'center', textAlign: 'center', marginLeft: 10 }
})
export default MyTaskScreen;
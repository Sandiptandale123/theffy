import { Toast } from "native-base";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Button,
    FlatList, TouchableOpacity,ToastAndroid
} from "react-native";
import { connect } from 'react-redux';
import Loader from "../../../components/Loader/Loader";
import Toaster from "../../../components/ToastComponent/Toaster";
import Api from "../../../utils/Api";
import colors from '../../../utils/colors';
const MakeOffer = (props) => {
    const { navigation } = props;
    const { postItem, userInfo } = navigation.state.params
    const [showLoader, setLoader] = useState(false);

    const [message, setMessage] = useState("");
    const [offer, setOffer] = useState("");
    console

    const MakeOfferApi=()=>{
        setLoader(true);

        const formData = new FormData();

        formData.append('post_id', postItem && postItem.id);
        formData.append('jobseeker_id',userInfo && userInfo.id);
        formData.append('jobseeker_name', postItem && postItem.username);
        formData.append('employee_id', postItem && postItem.user_id );
        formData.append('msg', message);
        formData.append('offer', offer);
        formData.append('jobseeker_image', postItem && postItem.profile_pic);
        debugger

        Api.postApi(formData, "Post_Offered")
            .then((response) => {
                setLoader(false);
                console.log(response,"Responce of make offer");
              
                // console.log(userData, "userdata from chat");
                if (response.status === 200) {
                    // Toast.suc(
                    //     response.data.message,
                    //     ToastAndroid.SHORT,
                    //     ToastAndroid.CENTER
                    //   );
                    setOffer('');
                    setMessage('')
                    Toaster.SuccessToaster(response.data.message)
                    navigation.navigate("chatHome")
                

                }
                

            })
            .catch((error) => {
                setLoader(false);
                console.log(error, 'error')

                if (error.response.data) {
                }
            });






    }


    return (
        <> 
       {showLoader? <Loader />:
        <SafeAreaView style={styles.safearea}>


            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', margin: 20 }}>

                <Text style={{ paddingVertical: 10, fontWeight: 'bold', textAlign: 'left' }}>Enter Your Comment/Message</Text>
                <TextInput
                    multiline={true}
                    style={[styles.input, { height: 100 }]}
                    onChangeText={value => {
                        setMessage(value)
                    }}
                    value={message}
                    placeholder="Enter Your Comment/Message"

                />
                <Text style={{ paddingVertical: 10, fontWeight: 'bold', textAlign: 'left' }}>Enter Your Offer</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={value => {
                        setOffer(value)
                    }}
                    value={offer}
                    placeholder="Enter Your Offer"

                />
                <TouchableOpacity style={[styles.appButtonContainer, { width: '80%', alignSelf: 'center', marginVertical: 20 }]} onPress={() => {
                    MakeOfferApi();
                }}>
                    <Text style={styles.appButtonText}>{"Send"}</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView>}
        </>
    )
};

const styles = StyleSheet.create({
    safearea: {
        flex: 1, backgroundColor: 'white',
    },
    input: {
        height: 40,
        width: "100%",
        // margin: 12,
        marginBottom: 12,
        color: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#0ba6ff'
    },

    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
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
        backgroundColor: colors.mainColor,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    rowBtn: {
        // elevation: 2,
        height: 50,
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: colors.mainColor,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    rowTextBtn: {
        fontSize: 16,
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
export default connect(mapStateToProps)(MakeOffer);


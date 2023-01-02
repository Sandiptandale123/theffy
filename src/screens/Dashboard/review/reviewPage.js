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
    FlatList, TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import colors from '../../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
const ReviewPage = (props) => {
    const { navigation } = props;
    const [rating, setRating] = useState("");

    return (
        <SafeAreaView style={styles.safearea}>


            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', margin: 20 }}>

                <Text style={{ paddingVertical: 10, fontWeight: 'bold', textAlign: 'center', fontSize: 16, }}>Give Your Rating Of Your Work</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Icon name="ios-star" size={20} style={{ alignItems: 'center', margin: 5, color: '#ffc508' }} />
                    <Icon name="ios-star" size={20} style={{ alignItems: 'center', margin: 5, color: '#ffc508' }} />
                    <Icon name="ios-star" size={20} style={{ alignItems: 'center', margin: 5, color: '#ffc508' }} />
                    <Icon name="ios-star" size={20} style={{ alignItems: 'center', margin: 5, color: '#ffc508' }} />
                </View>
                <TextInput
                    multiline={true}
                    style={[styles.input, { height: 120 }]}
                    onChangeText={value => {
                        setRating(value)
                    }}
                    value={rating}
                    placeholder="Start Typing Here...."

                />

                <TouchableOpacity style={[styles.appButtonContainer, { width: '80%', alignSelf: 'center', marginVertical: 20 }]} onPress={() => {

                }}>
                    <Text style={styles.appButtonText}>{"Submit"}</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaView>
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
export default connect(mapStateToProps)(ReviewPage);


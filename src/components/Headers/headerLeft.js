import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderLeft = ({ navigation }) => {

    const toggleCustomDrawer = () => {
        console.log(navigation, 'navigation')
        navigation.toggleDrawer();
    }

    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => toggleCustomDrawer()} >
                <View style={{ marginLeft: 20 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center', }}>
                        <Icon name="ios-list" size={25} color={'#fe9d2b'} />

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default HeaderLeft;
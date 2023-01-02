import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import ToastComponent from '../../components/ToastComponent/Toaster';

const HeaderTitle = props => {
  const {navigation, userInfo} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            alignSelf: 'flex-start',
            color: 'black',
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (userInfo === null) {
            ToastComponent.ErrorToaster('Please LogIn to make Post');
          } else {
            navigation.navigate('PostTask1', {isEdit: false});
          }
        }}
        style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
        <Icon name="ios-add" size={30} color={'#fe9d2b'} />
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}
export default connect(mapStateToProps)(HeaderTitle);

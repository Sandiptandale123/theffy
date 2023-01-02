import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';

import {UserAction} from '../../reduxManager';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const DrawerPage = props => {
  const {navigation} = props;
  console.log(
    props.userInfo,
    'props.userInfoprops.userInfoprops.userInfodrawer',
  );

  const clearStorage = () => {
    UserAction.resetUserDetails();
    navigation.navigate('SplashScreen');
  };

  const list = [
    {
      name: 'Dashboard',
      id: 1,
      icon: '',
    },
    {
      name: 'Payment History',
      id: 2,
      icon: '',
    },
    {
      name: 'Reviews',
      id: 3,
      icon: '',
    },
    {
      name: 'Wallet',
      id: 4,
      icon: '',
    },
    {
      name: 'Dispute',
      id: 5,
      icon: '',
    },
    {
      name: 'Settings',
      id: 6,
      icon: '',
      subList: [
        {
          name: 'Task alerts',
          id: 3,
          icon: '',
        },
        {
          name: 'Notifications',
          id: 3,
          icon: '',
        },
        {
          name: 'Edit Profile',
          id: 3,
          icon: '',
        },
      ],
    },
    {
      name: 'Post Task',
      id: 7,
      icon: '',
    },
    {
      name: 'Help',
      id: 8,
      icon: '',
    },
    {
      name: 'Refer Friends',
      id: 9,
      icon: '',
    },
  ];
  const createTwoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => clearStorage(),
      },
    ]);
  const [listIndex, setIndex] = useState(-1);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 8}}>
          <View
            style={{
              backgroundColor: colors.mainColor,
              borderBottomRightRadius: 50,
              padding: 40,
            }}>
            <View style={styles.itemView}>
              <TouchableHighlight style={[styles.profileImgContainer]}>
                <Image
                  source={require('../../assets/camera.png')}
                  style={styles.profileImg}
                />
              </TouchableHighlight>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  {props.userInfo && props.userInfo.user_name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  {props.userInfo && props.userInfo.contact}
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            {list.map((e, i) => {
              return (
                <>
                  <TouchableOpacity
                    style={{
                      borderBottomColor: 'white',
                      marginHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      if (e.id === 9) {
                        navigation.navigate('ReferPage');
                      } else if (e.id === 1) {
                        // alert("o")
                        navigation.navigate('Home');
                      } else if (e.id === 2) {
                        navigation.navigate('Payment');
                      } else if (e.id === 3) {
                        // setIndex(e.id)
                        navigation.navigate('reviews');
                      } else if (e.id === 4) {
                        // setIndex(e.id)
                        navigation.navigate('Wallet');
                      } else if (e.id === 5) {
                        // setIndex(e.id)
                        navigation.navigate('dispute');
                      } else if (e.id === 7) {
                        // setIndex(e.id)
                        navigation.navigate('PostTask1', {isEdit: false});
                      }
                    }}>
                    <Text
                      style={{
                        padding: 20,
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: 'gray',
                      }}>
                      {e.name}
                    </Text>
                    <Icon
                      name={
                        listIndex === 4 ? 'ios-arrow-down' : 'ios-arrow-forward'
                      }
                      size={25}
                      color="gray"
                    />
                  </TouchableOpacity>
                  {listIndex === 4 &&
                    e &&
                    e.subList &&
                    e.subList.map((a, i) => {
                      return (
                        <>
                          <TouchableOpacity
                            style={{
                              borderBottomColor: 'white',
                              marginHorizontal: 20,
                              marginLeft: 30,
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}
                            onPress={() => {}}>
                            <Text
                              style={{
                                padding: 20,
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: 'gray',
                              }}>
                              {a.name}
                            </Text>
                            <Icon
                              name={'ios-arrow-forward'}
                              size={25}
                              color="gray"
                            />
                          </TouchableOpacity>
                        </>
                      );
                    })}
                </>
              );
            })}
          </View>
        </View>

        <View style={{flex: 0.8}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: colors.mainColor,
              marginHorizontal: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              if (props.userInfo) {
                createTwoButtonAlert();
              } else {
                navigation.navigate('Login');
              }
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                padding: 10,
                textAlign: 'center',
                color: 'white',
              }}>
              {props.userInfo ? 'Logout' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 60,
    width: 60,
    borderRadius: 40,
  },
  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  itemView: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}
export default connect(mapStateToProps)(DrawerPage);

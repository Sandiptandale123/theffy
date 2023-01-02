import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Loader from '../../../components/Loader/Loader';
import colors from '../../../utils/colors';
import Api from '../../../utils/Api';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ToastComponent from '../../../components/ToastComponent/Toaster';
import Icons from 'react-native-vector-icons/FontAwesome';
import { UserAction } from '../../../reduxManager/index';
import Validation from '../../../components/validations/validation';
import { ScrollView } from 'react-native-gesture-handler';
import { Radio, CheckBox } from 'native-base';
import Toaster from '../../../components/ToastComponent/Toaster';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
const Register = props => {
  const [registerParams, setRegisterParams] = useState({
    name: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
    address: '',
    usertype: 'Task',
    pick_lat: '20.125255',
    pick_lng: '12.25556',
  });
  const [showErorMsg, setErrorMsg] = useState('');
  const [isOTPSend, setIsOTP] = useState(false);
  const { navigation } = props;
  const [showLoader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isAgree, setIsAgree] = useState(true);
  const [showAgree, setShowAgree] = useState(false);

  useEffect(() => {
    setErrorMsg('');
  }, []);

  // useEffect(() => {
  //   hasLocationPermission();
  //   if (!hasLocationPermission) {
  //     return;
  //   } else {
  //     getLocation();
  //   }
  // })

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
       await hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasLocationPermission = await hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    //this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({ location: position, loading: false });
          console.log(position);


          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {

              var addressComponent =
                json.results[0].address_components[0].long_name +
                ' ' +
                json.results[0].address_components[1].long_name;
              console.log("printposition", JSON.stringify(json.results[0].geometry.location))
              console.log(addressComponent, 'addressComponent');

              this.setState({
                home_address: json.results[0].formatted_address,
                lat: json.results[0].geometry.location.lat,
                lng: json.results[0].geometry.location.lng,
              });
            })
            .catch(error => console.warn(error));
        },
        error => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    //});
  };


  const RegisterAPI = () => {
    if (
      registerParams.name !== '' &&
      registerParams.email &&
      registerParams.phone
    ) {
      if (
        !Validation.validateEmail(registerParams.email) &&
        registerParams.email
      ) {
        // setErrorMsg('Invalid Email..!');
        ToastComponent.ErrorToaster('Invalid Email..!');
        return;
      }
      if (registerParams.phone) {
        var Value = registerParams.phone.length;
        if (Value !== 10) {
          //setErrorMsg('Please Enter Valid Mobile Number..!');
          ToastComponent.ErrorToaster('Please Enter Valid Mobile Number..!');
          return;
        }
      }
      if (registerParams.password !== registerParams.cPassword) {
        //setErrorMsg('Password Not Match');
        ToastComponent.ErrorToaster('Password Not Match');
        return;
      }
      setErrorMsg('');
      setLoader(true);
      const formData = new FormData();
      formData.append('first_name', registerParams.name);
      formData.append('last_name', registerParams.lname);
      formData.append('address', registerParams.address);
      formData.append('phone', registerParams.phone);
      formData.append('usertype', registerParams.usertype);
      formData.append('pick_lat', registerParams.pick_lat);
      formData.append('pick_lng', registerParams.pick_lng);
      formData.append('email', registerParams.email);
      formData.append('password', registerParams.password);
      console.log(JSON.stringify(formData), 'printformdata');
      Api.postApi(formData, 'user_registration')
        .then(response => {
          console.log(response, 'responseresponse');
          if (response.status === 200) {
            setLoader(false);

            // navigation.navigate('ValidateOtp', { userRegRes: response.data.data });
            if (response.data.error === 'true') {
              alert(response.data.message);
              return;
            }
            // UserAction.setUserDetails(response.data.message);
            ToastComponent.SuccessToaster(
              response.data.message + response.data.otp,
            );
            navigation.navigate('ValidateOtp', {
              userId: response.data.user_id,
              mobile: registerParams.phone,
            });
            // navigation.navigate('Drawer');
          }
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          console.log(error.response.data, 'error.response.data');
          console.log(error.response.status, 'status.response.dastatusta');
          if (error.response.data && error.response.data.message.password) {
            setErrorMsg(error.response.data.message.password);
          } else {
            setErrorMsg(error.response.data.message);
          }
        });
    } else {
      if (!registerParams.email) {
        ToastComponent.ErrorToaster('Please insert Email..!');
        // setErrorMsg('Please insert Email..!')
      } else {
        ToastComponent.ErrorToaster('Please insert All Fields..!');
        //setErrorMsg('Please insert Full name..!')
      }
      if (!registerParams.name) {
        ToastComponent.ErrorToaster('Please insert First Name..!');
        //setErrorMsg('Please insert First Name..!')
      } else if (!registerParams.lname) {
        ToastComponent.ErrorToaster('Please insert Last Name..!');
        //setErrorMsg('Please insert Last Name..!')
      } else if (!registerParams.phone) {
        ToastComponent.ErrorToaster('Please insert Mobile number..!');
        // setErrorMsg('Please insert Mobile number..!')
      } else if (!registerParams.phone) {
        ToastComponent.ErrorToaster('Please insert Mobile number..!');
        // setErrorMsg('Please insert Mobile number..!')
      } else if (!registerParams.password) {
        ToastComponent.ErrorToaster('Please insert Password..!');
        // setErrorMsg('Please insert Mobile number..!')
      } else if (!registerParams.cPassword) {
        ToastComponent.ErrorToaster('Please insert Confirm Password..!');
        // setErrorMsg('Please insert Mobile number..!')
      } else if (!registerParams.address) {
        ToastComponent.ErrorToaster('Please insert Your Address..!');
        // setErrorMsg('Please insert Mobile number..!')
      }
    }
  };
  const [viewPass, setViewPass] = useState(true);
  const [viewPassC, setViewPassC] = useState(true);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <ScrollView style={styles.safearea}>
          <View style={styles.container}>
            <View>
              <View style={styles.lookingView}>
                <View style={styles.lookingViewLeft}>
                  <View style={styles.lookingViewLeftTitle}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Login');
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="ios-arrow-round-back"
                          style={{ marginRight: 10, alignSelf: 'center' }}
                          size={30}
                          color="black"
                        />
                        <Text style={styles.lookingViewLeftTitleText}>
                          Enter Your Details
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.lookingViewLeftContentText,
                      ]}>
                      Login Here
                    </Text>
                  </View>
                </View>
                <View style={styles.lookingViewRight}>
                  <Image
                    style={{ height: 80, width: 120 }}
                    source={require('../../../assets/sidebar-bg-create-account.jpg')}
                  />
                </View>
              </View>

              {/* <View style={styles.imageMainView}>
                                <Image
                                    style={styles.image}
                                    source={require('../../../assets/undraw_Chat_re_re1u.png')}
                                />
                            </View> */}
              <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <Text style={styles.errorText}>{showErorMsg}</Text>
                <View style={styles.input_div}>
                  <Text style={styles.lable}>Your First Name</Text>
                  <TextInput
                    onChangeText={value => {
                      setRegisterParams({ ...registerParams, name: value });
                    }}
                    placeholder="Enter First Name"
                    value={registerParams.name}
                    style={styles.textInputStyle}
                  />
                </View>
                <View style={styles.input_div}>
                  <Text style={styles.lable}>Your Last Name</Text>
                  <TextInput
                    onChangeText={value => {
                      setRegisterParams({ ...registerParams, lname: value });
                    }}
                    placeholder="Enter Last Name"
                    value={registerParams.lname}
                    style={styles.textInputStyle}
                  />
                </View>
                <View style={styles.input_div}>
                  <Text style={styles.lable}>Mobile Number</Text>
                  <TextInput
                    keyboardType={'numeric'}
                    maxLength={10}
                    onChangeText={value => {
                      setRegisterParams({
                        ...registerParams,
                        phone: Validation.NumberValidation(value, 10),
                      });
                    }}
                    placeholder="Enter Mobile Number"
                    value={registerParams.phone}
                    style={styles.textInputStyle}
                  />
                </View>
                <View style={styles.input_div}>
                  <Text style={styles.lable}>Email</Text>
                  <TextInput
                    onChangeText={value => {
                      setRegisterParams({ ...registerParams, email: value });
                    }}
                    placeholder="Enter Email Id"
                    value={registerParams.email}
                    style={styles.textInputStyle}
                  />
                </View>
                <View style={styles.input_div}>
                  <Text style={styles.lable}>Password</Text>
                  <View style={styles.locationInput}>
                    <TextInput
                      style={{ height: 40, width: '90%', borderRadius: 5 }}
                      secureTextEntry={viewPass}
                      onChangeText={value => {
                        setRegisterParams({ ...registerParams, password: value });
                      }}
                      placeholder="Enter Password"
                      value={registerParams.password}
                    />
                    <TouchableOpacity
                      style={{ width: '10%' }}
                      onPress={() => {
                        setViewPass(!viewPass);
                      }}>
                      <Icon
                        name={!viewPass ? 'ios-eye' : 'ios-eye-off'}
                        size={25}
                        color={'#9f9c9c'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.input_div}>
                  <Text style={styles.lable}>Confirm Password</Text>
                  <TextInput
                    secureTextEntry={viewPassC}
                    onChangeText={value => {
                      setRegisterParams({ ...registerParams, cPassword: value });
                    }}
                    placeholder="Enter Confirm Password"
                    value={registerParams.cPassword}
                    style={styles.textInputStyle}
                  />
                </View>

                <View style={styles.input_div}>
                  <Text style={styles.lable}>
                    What would you like to do on theffy?
                  </Text>
                  <View style={styles.msg}>
                    <TouchableOpacity
                      onPress={() => {
                        setRegisterParams({
                          ...registerParams,
                          usertype: 'Task',
                        });
                      }}
                      style={[
                        styles.postButton,
                        {
                          backgroundColor:
                            registerParams.usertype === 'Task'
                              ? colors.mainColor
                              : 'white',
                        },
                      ]}
                      activeOpacity={0.8}>
                      <Text
                        style={[
                          styles.appButtonText1,
                          {
                            color:
                              registerParams.usertype === 'Task'
                                ? 'white'
                                : colors.mainColor,
                          },
                        ]}>
                        Post Task
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setRegisterParams({
                          ...registerParams,
                          usertype: 'Help',
                        });
                      }}
                      style={[
                        styles.postButton,
                        {
                          backgroundColor:
                            registerParams.usertype === 'Help'
                              ? colors.mainColor
                              : 'white',
                        },
                      ]}
                      activeOpacity={0.8}>
                      <Text
                        style={[
                          styles.appButtonText1,
                          {
                            color:
                              registerParams.usertype === 'Help'
                                ? 'white'
                                : '#69c4ff',
                          },
                        ]}>
                        Earn Money
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={styles.input_div}>
                  <Text style={styles.lable}>Your Location</Text>
                  <View style={styles.locationInput}>
                    <TextInput
                      style={{ height: 40, width: '90%', borderRadius: 4 }}
                      onChangeText={value => {
                        setRegisterParams({ ...registerParams, address: value });
                      }}
                      placeholder="Enter Your Location"
                      value={registerParams.address}
                    />
                    <TouchableOpacity
                      style={{ width: '10%' }}
                      onPress={() => {
                        //setViewPass(!viewPass)
                      }}>
                      <Icon name={'ios-locate'} size={25} color={'#9f9c9c'} />
                    </TouchableOpacity>
                  </View>
                </View> */}
                <View>
                  <TouchableOpacity
                    value={!isAgree}
                    onPress={() => {
                      setIsAgree(!isAgree);
                      setShowAgree(!showAgree);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Icon
                      // name={'ios-radio-button-on'}
                      name={
                        showAgree === false
                          ? 'ios-radio-button-off'
                          : 'ios-radio-button-on'
                      }
                      size={25}
                      color={'#69c4ff'}
                    />
                    <Text style={{ marginLeft: 10, fontFamily: 'Montserrat-Regular', }}>
                      I agree to the theffy terms of use & privacy
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={{ marginVertical: 20 }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (showAgree === false) {
                          ToastComponent.ErrorToaster('Please agree terms');
                        } else if (showAgree === true) {
                          RegisterAPI();
                        }
                      }}
                      style={styles.appButtonContainer}
                      activeOpacity={0.8}>
                      <Text style={styles.appButtonText}>Get Started</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{ alignItems: 'center', marginBottom: 20 }}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    <Text style={{ fontFamily: 'Montserrat-Regular', }}>
                      Already have Account?{' '}
                      <Text style={{ color: colors.mainColor, fontFamily: 'Montserrat-Regular', }}>Sign In</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  locationInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#69c4ff',
    borderRadius: 5,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  msg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  imageMainView: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.mainColor,
    flex: 1,
    height: 250,
    padding: 5,
  },
  lookingView: {
    backgroundColor: '#ebf3f9',
    height: 200,
    flexDirection: 'row',
  },
  lookingViewLeft: {
    width: '50%',
    // height: "100%",
    // backgroundColor: "red",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  lookingViewLeftTitle: {
    // height: "50%",
    //   backgroundColor:"orange",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 5,
    padding: 10,
  },
  lookingViewLeftTitleText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#193863',
    marginVertical: 5,
  },
  lookingViewLeftContent: {
    // height: "50%",
    //   backgroundColor:"orange",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  lookingViewLeftContentText: {
    fontSize: 12,
    // fontWeight: "bold",
    textAlign: 'left',
    color: '#ABC1D2',
    marginLeft: 20,
    fontFamily: 'Montserrat-Regular',
  },

  lookingViewRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'contain',
  },
  postButton: {
    elevation: 2,
    backgroundColor: '#69c4ff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    width: '45%',
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    // paddingVertical: 10,
    // paddingHorizontal: 5,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  appButtonText1: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  input_div: {
    marginVertical: 5,
  },
  lable: {
    color: '#4E4E4E',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginBottom: 6,
  },
  textInputStyle: {
    height: 40,
    borderColor: colors.mainColor,
    borderRadius: 5,
    borderWidth: 1,
  },
  social_icn: {
    borderWidth: 1,
    paddingVertical: 12,
    textAlign: 'center',
    borderColor: 'lightgray',
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Register;

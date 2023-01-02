import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Keyboard,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../../components/Loader/Loader';
import colors from '../../../utils/colors';
import Api from '../../../utils/Api';
import AsyncStorage from '@react-native-community/async-storage';
import ToastComponent from '../../../components/ToastComponent/Toaster';
import SuccessModal from '../../../components/Modals/successModel';
import Icons from 'react-native-vector-icons/FontAwesome';
import { UserAction } from '../../../reduxManager/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { State } from 'react-native-gesture-handler';

const Login = props => {
  const loderTimer = async () => {
    setTimeout(() => { }, 3000);
  };

  const [showErorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
  }, []);
  const validateEmail = userEmail => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };
  const getPasscode = () => {
    navigation.navigate('ForgotPasswordPage');
  };

  const { navigation } = props;
  const [showLoader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  // const [loginParams, setLoginParums] = useState({
  //   email: "",
  //   password: "",
  // });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useState Manipulator
  // const updateUser = (e) => {
  //   setLoginParums({
  //     ...loginParams,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const loginApi = () => {
    debugger;
    setErrorMsg('');
    if (email && password) {
      // if (!validateEmail()) {
      //     setErrorMsg('Invalid Email');
      //     return;
      // }
      setErrorMsg('');
      setLoader(true);
      loderTimer();
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      debugger;

      setLoader(true);

      return new Promise((resolve, reject) => {
        Api.postApi(formData, 'user_login')
          .then(response => {
            console.log(response, 'login');
            if (response.status === 200) {
              if (response.data.error === 'true') {
                alert(response.data.message);
                return;
              }
              UserAction.setUserDetails(response.data.data);
              setLoader(false);

              setShowModal(true);
              timeout();
              // ToastComponent.SuccessToaster("Welcome to Theffy");
            }
            resolve(response);
          })
          .catch(error => {
            setLoader(false);
            console.log(error.response.data, 'login error.response.data');
            console.log(error.response.status, 'status.response.dastatusta');
            if (error.response.data) {
              setErrorMsg(error.response.data.message);
            }
          });
      });
    } else {
      if (!email) {
        setErrorMsg('Please enter Email or Mobile..!');
      } else {
        setErrorMsg('Please enter Password..!');
      }
    }
  };
  const [text, onChangeText] = React.useState('123456789');
  // const [userId, onChangeUserId] = React.useState(null);
  // const [password, onChangePassword] = React.useState(null);
  const [viewPass, setViewPass] = useState(true);
  const ShowcreateJobModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);
  const timeout = () => {
    setTimeout(function () {
      setShowModal(false);
      // setLoader(false);
      navigation.navigate('Drawer');
    }, 3000);
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.safearea}>
          <ScrollView>
            <View style={styles.container}>
              {/* <View style={styles.containerImageView}>
            <View style={{ backgroundColor: "#ebf3f9", padding: 10 }}>
              <Text style={styles.titleSignUp}>Enter Your Details</Text>

              <Text style={styles.titleSubText}>
                Login here
            </Text>

            </View>

            <Image
              resizeMode={"contain"}
              style={styles.imageView}
              source={require("../../../assets/login-header.png")}
            />

          </View> */}

              <View style={styles.lookingView}>
                <View style={styles.lookingViewLeft}>
                  <View style={styles.lookingViewLeftTitle}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('GetStarted');
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
                      {/* <Text style={[styles.lookingViewLeftContentText, { fontWeight: 'normal', marginRight: 30, }]}>
                        Login here
                      </Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.lookingViewRight}>
                  <Image
                    style={{ height: 130, width: 120 }}
                    source={require('../../../assets/login-header.png')}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginVertical: 20,
                }}>
                <View>
                  <TouchableOpacity
                    style={[
                      styles.social_icn,
                      { backgroundColor: '#3B5998', flexDirection: 'row' },
                    ]}
                    activeOpacity={0.5}>
                    <Image
                      resizeMode={'center'}
                      source={require('../../../assets/facebook.png')}
                      style={{ height: 15, width: 15 }}
                    />
                    <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', }}>
                      Facebook
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={[
                      styles.social_icn,
                      { backgroundColor: '#DF1212', flexDirection: 'row' },
                    ]}
                    activeOpacity={0.5}>
                    <Image
                      source={require('../../../assets/google.png')}
                      style={{ height: 15, width: 15, marginRight: 5, tintColor: '#fff' }}
                    />
                    <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', }}>
                      Google
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                  flex: 1,
                  margin: 10,
                }}>
                <View style={styles.mobileView}>
                  <Text style={{ marginVertical: 10, color: '#4E4E4E', fontFamily: 'Montserrat-Regular', }}>
                    Email Id / Mobile Number
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Enter User ID"
                  />
                </View>
                <View style={styles.mobileView}>
                  <Text style={{ marginVertical: 10, color: '#4E4E4E', fontFamily: 'Montserrat-Regular', }}>Password</Text>
                  <View style={styles.locationInput}>
                    <TextInput
                      style={{ height: 40, width: '90%', borderRadius: 5 }}
                      onChangeText={setPassword}
                      value={password}
                      placeholder="Enter Password"
                      textContentType="password"
                      secureTextEntry={viewPass}
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
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPasswordPage');
                }}
                style={styles.forgotTouchable}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={loginApi}>
                <Text style={styles.loginButtonText}>SUBMIT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: 'center', marginHorizontal: 10, marginVertical: 20, paddingVertical: 5, }}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Medium', }}>
                  New Member?
                  <Text
                    style={{
                      color: '#69C4FF',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                      textDecorationLine: 'underline',
                    }}>
                    {' '}
                    Create Your New Account
                  </Text>
                </Text>
              </TouchableOpacity>

              <View
                style={[styles.containerImageView, { backgroundColor: '#fff' }]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Drawer');
                  }}>
                  <Text style={styles.titleSignUp}>SKIP</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showModal && (
              <SuccessModal showModal={showModal} closeModal={closeModal} />
            )}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: 'white',
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
    marginVertical: 5,
    color: '#193863',
    fontFamily: 'Montserrat-Bold',
  },
  lookingViewLeftContent: {
    // height: "50%",
    //   backgroundColor:"orange",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  lookingViewLeftContentText: {
    fontSize: 14,
    // fontWeight: "bold",
    textAlign: 'left',
    color: '#bbcedc',
  },

  lookingViewRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    // margin: 12,
    marginBottom: 12,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: '#0ba6ff',
  },
  containerImageView: {
    backgroundColor: '#ebf3f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  social_icn: {
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    borderColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageView: {
    width: '100%',
    height: 200,
    margin: 10,
  },
  imageView2: {
    width: '30%',
    height: 100,
    margin: 10,
  },
  titleText: { fontWeight: 'bold', fontSize: 32, color: '#69c4ff' },
  titleSubText: {
    color: '#101010',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    textAlign: 'justify',
    fontSize: 14,
  },
  titleSignUp: {
    color: colors.mainColor,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleInputBox: {
    color: '#000',
    fontSize: 16,
    width: '30%',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  mobileView: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  mobileView1: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  // loginView:{color: '#fff',  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10},
  // loginButton:{color: '#fff', width:100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10},
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
    marginTop: '20%'
  },
  forgotTouchable: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 4,
    // width: '80% ',
  },
  loginButtonText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#69C4FF',
    fontFamily: 'Montserrat-Medium',
  },
  loginButtonContainer: {
    alignItems: 'center',
    // backgroundColor: "#DDDDDD",
    padding: 10,
    flex: 1,
    width: '100%',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skip_btn: {
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 40,
    fontSize: 12,
    color: '#0ba6ff',
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: colors.gold,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default Login;

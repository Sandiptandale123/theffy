import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import Loader from '../../../components/Loader/Loader';
import colors from '../../../utils/colors';
import Api from '../../../utils/Api';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ToastComponent from '../../../components/ToastComponent/Toaster';
import Icons from 'react-native-vector-icons/FontAwesome';
import {UserAction} from '../../../reduxManager/index';
import {color} from 'react-native-reanimated';

const ForgotPassword = props => {
  const loderTimer = async () => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const [showErorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
  }, []);
  const validateEmail = userEmail => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(loginParams.email).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };
  const getPasscode = () => {
    navigation.navigate('ForgotPasswordPage');
  };

  const {navigation} = props;
  const [showLoader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [loginParams, setLoginParums] = useState({
    email: '',
    password: '',
  });

  const loginApi = () => {
    debugger;
    setErrorMsg('');
    if (loginParams.email) {
      if (!validateEmail()) {
        setErrorMsg('Invalid Email');
        return;
      }
      setErrorMsg('');
      setLoader(true);
      loderTimer();
      const formData = new FormData();
      formData.append('email', loginParams.email);
      formData.append('password', loginParams.password);
      debugger;
      let formDataText = {
        email: loginParams.email,
        password: loginParams.password,
      };
      return new Promise((resolve, reject) => {
        Api.postApi(formDataText, 'Auth/forgot_password')
          .then(response => {
            console.log(response, 'login');
            if (response.status === 200) {
              // UserAction.setUserDetails(response.message);
              ToastComponent.SuccessToaster(response.data.message);
              navigation.navigate('Login');
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
      if (!loginParams.email) {
        setErrorMsg('Please enter Email..!');
      } else {
        setErrorMsg('Please enter Password..!');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.h1}>Forgot Password</Text>
            <Text style={styles.errorText}>{showErorMsg}</Text>

            <View style={styles.input_div}>
              <Text style={styles.lable}>Email</Text>
              <TextInput
                style={{
                  height: 54,
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  borderRadius: 4,
                }}
                onChangeText={value => {
                  setLoginParums({...loginParams, email: value});
                }}
                value={loginParams.email}
              />
            </View>
          </View>

          <View>
            <View style={{marginVertical: 20}}>
              <TouchableOpacity
                style={styles.appButtonContainer}
                activeOpacity={0.8}
                onPress={() => {
                  loginApi();
                  // navigation.navigate('HomePage');
                }}>
                <Text style={styles.appButtonText}>Send </Text>
              </TouchableOpacity>
            </View>
            {/* <View>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                        </View> */}
          </View>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text>
              Don't Have An Account?{' '}
              <Text style={{color: colors.mainColor}}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: colors.mainColor,
    borderRadius: 4,
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
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  input_div: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  lable: {
    color: '#6c757d',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  social_icn: {
    borderWidth: 1,
    paddingVertical: 12,
    textAlign: 'center',
    borderColor: 'lightgray',
    width: 150,
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default ForgotPassword;

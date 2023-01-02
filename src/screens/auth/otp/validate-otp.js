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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
const ValidateOtp = props => {
  const {userId, mobile} = props.navigation.state.params;
  console.log(userId, 'userIduserId');

  const loderTimer = async () => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const [showErorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
  }, []);

  const [isUser, setUser] = useState(true)
  const [confirm, setConfirm] = useState(null);
  const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onAuthStateChanged(user) {
         setUser(user);
        if (initializing) setInitializing(false);
        console.log(user,"useruseruseruser");
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
      signInWithPhoneNumber('+91' + mobile)
  },[mobile])


  async function signInWithPhoneNumber(mobile) {
    console.log("mobilemobile", JSON.stringify(mobile))
    try {
        const confirmation = await auth().signInWithPhoneNumber(mobile);
        console.log("printresponse", JSON.stringify(confirmation))
        setConfirm(confirmation);
    } catch (error) {
        //alert(error);
    }
};

async function confirmVerificationCode(code) {
    try {
        await confirm.confirm(code);
        setConfirm(null);
        if (registerParams.otp) {
            validateOTP();
        } else {
            // setErrorMsg('Please Enter OTP..!')
            alert('Please Enter OTP..!');
        }

    } catch (error) {
        console.log("submiterror",error)
        alert(error);
    }
}


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
    OTP1: '',
    OTP2: '',
    OTP3: '',
    OTP4: '',
  });

  const validateOTP = () => {
    debugger;
    setErrorMsg('');
    // if (loginParams.OTP1 && loginParams.OTP2 && loginParams.OTP3 && loginParams.OTP4 ) {
    // if (validateEmail()) {
    //     setErrorMsg('Please Insert OTP')
    // }
    if (loginParams.OTP1) {
      var otp = loginParams.OTP1; // + loginParams.OTP2 + loginParams.OTP3 + loginParams.OTP4;
      setErrorMsg('');
      setLoader(true);
      loderTimer();
      const formData = new FormData();
      formData.append('userotp', otp);
      formData.append('user_id', userId);
      debugger;
      // let formDataText = {
      //     'email': loginParams.email,
      //     'password': loginParams.password
      // }
      Api.postApi(formData, 'otp_verify')
        .then(response => {
          console.log(response, 'verify_otp');
          if (response.status === 200) {
            UserAction.setUserDetails(response.data);
            navigation.navigate('Drawer');
          } else {
            ToastComponent.ErrorToaster(response.data.message);
          }
        })
        .catch(error => {
          setLoader(false);
          console.log(error.response.data, 'login error.response.data');
          console.log(error.response.status, 'status.response.dastatusta');
          if (error.response.data) {
            setErrorMsg(error.response.data.message);
          }
        });
    } else {
      setErrorMsg('Please Insert OTP');
    }
  };
  let inputref1, inputref2, inputref3, inputref4;
  return (
    // <SafeAreaView style={styles.safeA}>
    //     {showLoader ? <Loader /> :
    //         <>

    <SafeAreaView style={styles.safearea}>
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.containerImageView}>
            <Image
              resizeMode={'center'}
              style={styles.imageView}
              source={require('../../../assets/undraw_winners_ao2o.png')}
            />
          </View>
          <View>
            <Text style={styles.h1}>Validate OTP</Text>
            <Text style={styles.errorText}>{showErorMsg}</Text>

            <View style={styles.input_div}>
              <Text style={styles.lable}>Mobile Number</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  editable={false}
                  style={styles.inputValue}
                  value={mobile}
                />
              </View>
            </View>

            <View style={styles.input_div}>
              <Text style={styles.lable}>OTP</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {/* <TextInput
                                    ref={ele => inputref1 = ele}
                                    style={styles.inputValue}
                                    onChangeText={value => {
                                        setLoginParums({ ...loginParams, OTP1: value });

                                    }}
                                    value={loginParams.OTP1}
                                    maxLength={4}
                                    keyboardType='numeric'

                                /> */}
                <OTPInputView
                  style={{
                    width: '80%',
                    height: 28,
                    borderColor: colors.mainColor,
                  }}
                  pinCount={4}
                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => { this.setState({code})}}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                    setLoginParums({...loginParams, OTP1: code});
                  }}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={{marginVertical: 20}}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.8}
                onPress={() => {
                  validateOTP();
                  // navigation.navigate('HomePage');
                }}>
                <Text style={styles.appButtonText}>Validate</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{textAlign: 'center'}}>OR</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
          </View>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text>
              {' '}
              Have An Account?{' '}
              <Text style={{color: colors.mainColor}}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
    //         </>
    //     }

    // </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  underlineStyleHighLighted: {
    borderColor: colors.mainColor,
  },
  underlineStyleBase: {
    borderColor: colors.mainColor,
  },
  safearea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  inputValue: {
    height: 45,
    flex: 1,
    borderColor: colors.mainColor,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  loginButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center',
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
    fontSize: 30,
    fontWeight: 'bold',
  },
  input_div: {
    marginVertical: 5,
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
  containerImageView: {
    // backgroundColor: "#ebf3f9",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageView: {
    width: '100%',
    height: 200,
    margin: 10,
  },
});

export default ValidateOtp;

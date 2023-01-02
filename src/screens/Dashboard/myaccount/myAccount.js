import React, { useEffect, useState } from 'react';
import { ScrollView, Image } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';

import Loader from '../../../components/Loader/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Appbar, Avatar } from 'react-native-paper';
import ion from 'react-native-vector-icons/Ionicons';
import Api from '../../../utils/Api';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import { SvgXml, SvgUri } from "react-native-svg";
import ImagePicker from 'react-native-image-picker';
import useForceUpdate from 'use-force-update';
import ToastComponent from "../../../components/ToastComponent/Toaster";
import { UserAction } from "../../../reduxManager/index";
const MyAccountPage = (props) => {

  const { userInfo } = props;
  const { navigation } = props;

  useEffect(() => {
    console.log("printuserinfo", JSON.stringify(userInfo))
  }, []);

  useEffect(() => {
    getUserInfo()
  }, [])

  const [url, setUrl] = useState('get_ActivePostByUser');
  const [featureListIndex, setFeatureListIndex] = useState(500);
  const [showLoader, setLoader] = useState(false);
  const [taskData, setTaskData] = useState('')
  const [isPostTasks, setPostTasks] = useState(true)
  const [isEarnMoney, setEarnMoney] = useState(true)
  const [show, setShow] = useState(false);
  const [showEarnMoney, setShowEarnMoney] = useState(false);

  const getUserInfo = () => {
    setLoader(true)
    const formData = new FormData();
    formData.append("user_id", userInfo && userInfo.id);

    console.log(formData, "formData error.response.data");

    Api.postApi(formData, "getuserbyid")
      .then((response) => {
        console.log(JSON.stringify(response), "getuserbyidgetuserbyidgetuserbyidgetuserbyidgetuserbyidgetuserbyid");
        setLoader(false)
        debugger

        if (response.status === 200) {
          // alert(response.data.message)
          setUserData(response.data.data[0])
          UserAction.setUserDetails(response.data.data[0]);

        }

      })
      .catch((error) => {
        setLoader(false)

        // setErrorMsg(error)
        ToastComponent.ErrorToaster('error')
        console.log(error, "response error.response.data");
        console.log(error, "status.response.dastatusta");

      });

  };

  const [user, setUserData] = useState(
    {
      "id": "",
      "user_name": "",
      "first_name": "",
      "last_name": "",
      "address": "",
      "email": "",
      "contact": "",
      "password": "",
      "about": "",
      "rate": "",
      "dob": "",
      "post_task": "",
      "earn_money": "",
      "facebook": "",
      "twitter": "",
      "instagram": "",
      "linkedin": "",
      "channel": "",
      "active": "",
      "ext": "Help",
      "country_code": "",
      "phone_number": "",
      "mobile": null,
      "account_type": "",
      "account_status": "",
      "profile_pic": "",
      "picture_url": "",
      "remember_token": "",
      "pick_lat": "",
      "pick_lng": "",
      "bank_holder": "",
      "bank_ac": "",
      "paypal_link": "",
      "stripe_link": "",
      "institution": "",
      "transit": "",
      "ids_copy": "",
      "licence_copy": "",
      "inquiry_id": "",
      "keys": "",
      "oauth_provider": "",
      "oauth_uid": "",
      "status": "",
      "otp": "",
      "refercode": "",
      "refer": "",
      "referstatus": "",
      "emailverify": "",
      "mobileverify": "",
      "licenceverify": "",
      "paymentverify": "",
      "slug": "",
      "created_at": "",
      "updated_at": ""
    }
  )





  console.log("printuserDatauserData", JSON.stringify(user))
  const accountRender = () => {
    return (
      <>


        <View>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                resizeMode='cover'
                style={styles.imageView}
                // source={require("../../../assets/undraw_winners_ao2o.png")}
                source={{ uri: 'https://theffy.com/newtheffy/' + user.profile_pic }}
              />
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'flex-start', }}>
              <Text style={{ textAlign: 'right', alignSelf: 'flex-end', fontSize: 10, marginRight: 10, backgroundColor: '#6c757d', color: 'white', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }}>$ {user && user.rate ? user.rate : "0"} PER HOUR</Text>
              <Text style={{ textAlign: 'right', alignSelf: 'flex-end', fontSize: 10, marginRight: 10 }}>Joined {moment(user.created_at).format('Do MMM YYYY')}</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user && user.user_name}</Text>
              <Text style={{ fontSize: 12, }}>{user && user.email}</Text>
              <Text style={{ fontSize: 10, }}>Last seen 2 hours ago</Text>
              <TouchableOpacity
                onPress={() => {
                  imageSelect();
                }}
                style={[styles.appButtonContainer1, { backgroundColor: "#007bff" }]}>
                <Text style={[styles.appButtonText1, { color: "#fff" }]}>{'Change Photo'}</Text>
              </TouchableOpacity>


            </View>

          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={styles.mobileView}>
              <Text style={styles.textStyle}>First Name</Text>
              <TextInput
                style={styles.input}
                value={user.first_name}
                onChangeText={value => {
                  setUserData({ ...user, first_name: value })
                }}
                placeholder="Enter First Name"

              />
            </View>
            <View style={styles.mobileView}>
              <Text style={styles.textStyle}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={user.last_name}
                onChangeText={value => {
                  setUserData({ ...user, last_name: value })
                }}
                placeholder="Enter Last Name"

              />
            </View>
          </View>
          <View style={styles.mobileView1}>
            <Text style={styles.textStyle}>Email</Text>
            <TextInput
              style={styles.input}
              value={user.email}
              onChangeText={value => {
                setUserData({ ...user, email: value })
              }}
              placeholder="Enter Email"

            />
          </View>
          <View style={styles.mobileView1}>
            <Text style={styles.textStyle}>Mobile Number</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              maxLength={10}
              value={user.contact}
              onChangeText={value => {
                setUserData({ ...user, contact: value })
              }}
              placeholder="Enter Mobile Number"

            />
          </View>
          <View style={styles.mobileView1}>
            <Text style={styles.textStyle}>About</Text>
            <TextInput multiline={true}
              numberOfLines={4}
              style={[styles.input, { height: 80 }]}
              value={user.about}
              onChangeText={value => {
                setUserData({ ...user, about: value })
              }}
              placeholder="Enter About"

            />
          </View>
          <View style={styles.mobileView1}>
            <Text style={styles.textStyle}>Location</Text>
            <TextInput
              style={styles.input}
              value={user.address}
              onChangeText={value => {
                setUserData({ ...user, address: value })
              }}
              placeholder="Enter Location"

            />
          </View>
          <Text style={[styles.textStyle, { marginHorizontal: 10 }]}>On Theffy I want to</Text>
          <View>

          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignItems: 'center', }}>


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>





              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} value={isPostTasks} onPress={() => {
                setPostTasks(!isPostTasks)
                setShow(!show)
                setUserData({ ...user, post_task: user.post_task === "yes" ? "no" : "yes" })
              }}>
                <Icon
                  // name={'ios-radio-button-on'} 
                  name={user.post_task === "yes" ? "ios-radio-button-on" : "ios-radio-button-off"}
                  size={30} color={'#69c4ff'} />
                <Text style={[styles.textStyle, { marginLeft: 5 }]} >Post Tasks</Text>
              </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} value={isEarnMoney} onPress={() => {
                setEarnMoney(!isEarnMoney)
                setShowEarnMoney(!showEarnMoney)

                setUserData({ ...user, earn_money: user.earn_money === "yes" ? "no" : "yes" })

              }}>
                <Icon
                  // name={'ios-radio-button-on'} 
                  name={user.earn_money === "yes" ? "ios-radio-button-on" : "ios-radio-button-off"}
                  size={30} color={'#69c4ff'} />
                <Text style={[styles.textStyle, { marginLeft: 5 }]} >Earn Money</Text>
              </TouchableOpacity>

            </View>

          </View>
          <View style={styles.mobileView1}>
            <Text style={styles.textStyle}>Set Your Rate</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={user.rate}
              onChangeText={value => {
                setUserData({ ...user, rate: value })
              }}
              placeholder="Enter Set Your Rate"

            />
          </View>
          <View style={styles.mobileView1}>
            <Text style={styles.textStyle}>Date of Birth</Text>
            <DatePicker
              style={{ width: '100%' }}
              date={user && user.dob === "0000-00-00" ? "2020-06-01" : user.dob}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              minDate="1900-06-01"
              maxDate="2030-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {

                setUserData({ ...user, dob: date })


              }}
            />
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={styles.mobileView}>
              <Text style={styles.textStyle}>Facebook</Text>
              <TextInput
                style={styles.input}
                value={user.facebook}
                onChangeText={value => {
                  setUserData({ ...user, facebook: value })
                }}
                placeholder="Paste Your Facebook Url"

              />
            </View>
            <View style={styles.mobileView}>
              <Text style={styles.textStyle}>Linkedin</Text>
              <TextInput
                style={styles.input}
                value={user.linkedin}
                onChangeText={value => {
                  setUserData({ ...user, linkedin: value })
                }}
                placeholder="Paste Your Linkedin Url"

              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={styles.mobileView}>
              <Text style={styles.textStyle}>Twitter</Text>
              <TextInput
                style={styles.input}
                value={user.twitter}
                onChangeText={value => {
                  setUserData({ ...user, twitter: value })
                }}
                placeholder="Paste Your Twitter Url"

              />
            </View>
            <View style={styles.mobileView}>
              <Text style={styles.textStyle}>Instagram</Text>
              <TextInput
                style={styles.input}
                value={user.instagram}
                onChangeText={value => {
                  setUserData({ ...user, instagram: value })
                }}
                placeholder="Paste Your Instagram Url"

              />
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                updateUserInfoApi();
              }}
              style={[styles.appButtonContainer, { backgroundColor: "#007bff" }]}>
              <Text style={[styles.appButtonText, { color: "#fff", textTransform: 'capitalize' }]}>{'Save Changes'}</Text>
            </TouchableOpacity>


          </View>

        </View >


      </>
    )
  }

  const forceUpdate = useForceUpdate();
  const handleClick = () => {
    forceUpdate();
  };

  const setToster = (text, color) => {
    const toasterData = {
      text: text,
      position: 'top',
      duration: 2000,
      buttonText: 'X',
      style: {
        backgroundColor: color,
        marginTop: 0,
        marginHorizontal: 20,
        borderRadius: 5,
      },
    };
    color === 1
      ? ToastComponent.ErrorToaster(text)
      : ToastComponent.SuccessToaster(text);
  };

  const options = {
    title: 'Select Image from',
    quality: 1,

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxWidth: 300,
    maxHeight: 400,
    allowsEditing: true,
    cropping: true,
  };


  const imageSelect = async () => {
    ImagePicker.showImagePicker(options, image => {
      if (image.didCancel) {
        console.log('User cancelled image picker');
      } else if (image.error) {
        setToster();
        console.log('ImagePicker Error: ', image.error);
        image.error && setToster(image.error, 1);
      } else if (image.customButton) {
        console.log('User tapped custom button: ', image.customButton);
      } else {
        if (image) {
          var getImageName = image.uri.split('/');
          Platform.OS === 'ios'
            ? (image.fileName = getImageName[getImageName.length - 1])
            : '';
          image.data = '';
          image.name = image.fileName;
          setUserData({ ...userData, profile_pic: image });
          handleClick();

        }
      }
    });
  };


  const verificationRender = () => {
    return (
      <View>
        <Text style={{ margin: 10, fontWeight: 'bold' }}>To start making money please verify your Document's</Text>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
            <View style={{ flex: 1 }}>
              <Image
                resizeMode='cover'
                style={styles.imageView1}
                // source={require("../../../assets/undraw_winners_ao2o.png")}
                source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/kyc.png' }}
              />
            </View>
            <View style={{ flexDirection: 'column', flex: 2 }}>
              <Text style={{ fontWeight: 'bold' }}>KYC Verification</Text>
              <Text style={{ fontSize: 12 }}>Start Earning today, but before that connect your KYC details</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <TouchableOpacity
                onPress={() => {

                }}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginHorizontal: 5,
                  borderRadius: 5, backgroundColor: "#69c4ff"
                }}>
                <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <View style={{ flex: 1 }}>
                <Image
                  resizeMode='cover'
                  style={styles.imageView1}
                  // source={require("../../../assets/undraw_winners_ao2o.png")}
                  source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/id-card.png' }}
                />
              </View>
              <View style={{ flexDirection: 'column', flex: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Police Check</Text>
                <Text style={{ fontSize: 12 }}>Provide peace of mind to other members by successfully completing a Police Check</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {

                  }}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    borderRadius: 5, backgroundColor: "#69c4ff"
                  }}>
                  <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ borderBottomWidth: 1, borderTopWidth: 1, margin: 10 }}>
            <Text style={{ padding: 10 }}>Note: When the submittion is done sucessfull the above button will get disabled and below message will display</Text>
          </View>

          <View >
            <Text style={{ padding: 10, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 20, color: 'green' }}>Your KYC has been Submited!</Text>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {/* <Image
                resizeMode='cover'
                style={styles.imageView2}
                source={require("../../../assets/undraw_winners_ao2o.png")}
              // source={{ uri: 'https://theffy.com/newtheffy/assets/Security.svg' }}
              /> */}

              <SvgUri
                style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                width={'50%'}
                height={100}
                uri={"https://theffy.com/newtheffy/assets/Security.svg"}
              // svgImages.techni}
              />

            </View>
            <View>


              <Text style={{ padding: 10, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 12 }}>Thank you for your verification, We have successfully verifired your KYC details. You can now proceed to start earning</Text>
              <View style={{ flexDirection: 'column', flex: 1, width: '50%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <TouchableOpacity
                  onPress={() => {

                  }}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 5, flex: 1, justifyContent: 'center', alignItems: 'center',
                    borderRadius: 5, backgroundColor: "green"
                  }}>
                  <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Start Earning'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }

  const paymentMethodRender = () => {
    return (
      <View>
        <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' }}>Bank account details</Text>
        <Text style={{ marginHorizontal: 10, fontSize: 12 }}>Please provide your bank details so you can get paid. We don't take any money from your account.</Text>
        <View style={styles.mobileView1}>
          <Text style={styles.textStyle}>Account holder name</Text>
          <TextInput
            style={styles.input}
            value={user.bank_holder}
            placeholder="John Smith"

          />
        </View>
        <View style={styles.mobileView1}>
          <Text style={styles.textStyle}>Account number</Text>
          <TextInput
            style={styles.input}
            value={user.bank_ac}
            placeholder="Ex.12345678"

          />
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={styles.mobileView}>
            <Text style={styles.textStyle}>Institution Number</Text>
            <TextInput
              style={styles.input}
              value={user.institution}
              placeholder="Enter Institution Number"

            />
          </View>
          <View style={styles.mobileView}>
            <Text style={styles.textStyle}>Transit Number</Text>
            <TextInput
              style={styles.input}
              value={user.transit}
              placeholder="Enter Transit Number"

            />
          </View>
        </View>
        <Text style={[styles.textStyle, { marginHorizontal: 10 }]}>For Online Transfer</Text>
        <View style={styles.mobileView1}>
          <Text style={styles.textStyle}>Your Paypal Link</Text>
          <TextInput
            style={styles.input}
            value={user.paypal_link}
            placeholder="Paste Your Paypal Link"

          />
        </View>
        <View style={styles.mobileView1}>
          <Text style={styles.textStyle}>Your Stripe Link</Text>
          <TextInput
            style={styles.input}
            value={user.stripe_link}
            placeholder="Paste Your Stripe Link"

          />
        </View>

        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => {

            }}
            style={[styles.appButtonContainer, { backgroundColor: "#007bff" }]}>
            <Text style={[styles.appButtonText, { color: "#fff", textTransform: 'capitalize', paddingHorizontal: 10 }]}>{'Submit'}</Text>
          </TouchableOpacity>


        </View>

      </View>
    )
  }

  const badgesRender = () => {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 12, marginVertical: 5 }}>With this Badges this will help in building trust in the community</Text>
        <Text style={{ fontSize: 12, marginVertical: 5 }}>Badges are issued when specific requirements are met. A green tick shows that the verification is currently active</Text>

        <Text style={{ fontSize: 16, borderBottomWidth: 1, paddingVertical: 10 }}>Id Badges</Text>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
            <View style={{ flex: 1 }}>
              <SvgUri
                style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                width={60}
                height={50}
                uri={"https://theffy.com/newtheffy/assets/img/badges/license.svg"}
              // svgImages.techni}
              />

              {/* <Image
                resizeMode='cover'
                style={styles.imageView1}
                // source={require("../../../assets/undraw_winners_ao2o.png")}
                source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/kyc.png' }}
              /> */}
            </View>
            <View style={{ flexDirection: 'column', flex: 2 }}>
              <Text style={{ fontWeight: 'bold' }}>Professional license</Text>
              <Text style={{ fontSize: 12 }}>Add your professional license, like cleaning license, electrial license and other.</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1, }}>
              <TouchableOpacity
                onPress={() => {

                }}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 5, backgroundColor: "#69c4ff"
                }}>
                <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {

                }}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 5, backgroundColor: "#ffc107"
                }}>
                <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Pending'}</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>

        <Text style={{ fontSize: 16, borderBottomWidth: 1, paddingVertical: 10 }}>Contact Badges</Text>

        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
            <View style={{ flex: 1 }}>
              {/* <Image
                resizeMode='cover'
                style={styles.imageView1}
                // source={require("../../../assets/undraw_winners_ao2o.png")}
                source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/kyc.png' }}
              /> */}
              <SvgUri
                style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                width={60}
                height={50}
                uri={"https://theffy.com/newtheffy/assets/img/badges/mobile-verify.svg"}
              // svgImages.techni}
              />
            </View>
            <View style={{ flexDirection: 'column', flex: 2 }}>
              <Text style={{ fontWeight: 'bold' }}>Mobile</Text>
              <Text style={{ fontSize: 12 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <TouchableOpacity
                onPress={() => {

                }}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,

                  borderRadius: 5, backgroundColor: "#ffc107"
                }}>
                <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Pending'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <View style={{ flex: 1 }}>
                <SvgUri
                  style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                  width={60}
                  height={50}
                  uri={"https://theffy.com/newtheffy/assets/img/badges/mail.svg"}
                // svgImages.techni}
                />
                {/* <Image
                  resizeMode='cover'
                  style={styles.imageView1}
                  // source={require("../../../assets/undraw_winners_ao2o.png")}
                  source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/id-card.png' }}
                /> */}
              </View>
              <View style={{ flexDirection: 'column', flex: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Email Verification</Text>
                <Text style={{ fontSize: 12 }}>An Verification will link will go to your mail id for verify.</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {

                  }}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,

                    borderRadius: 5, backgroundColor: "#ffc107"
                  }}>
                  <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Pending'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <View style={{ flex: 1 }}>
                {/* <Image
                  resizeMode='cover'
                  style={styles.imageView1}
                  // source={require("../../../assets/undraw_winners_ao2o.png")}
                  source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/kyc.png' }}
                /> */}
                <SvgUri
                  style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                  width={60}
                  height={50}
                  uri={"https://theffy.com/newtheffy/assets/img/badges/payment-method.svg"}
                // svgImages.techni}
                />
              </View>
              <View style={{ flexDirection: 'column', flex: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Payment Methods</Text>
                <Text style={{ fontSize: 12 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {

                  }}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,

                    borderRadius: 5, backgroundColor: "#ffc107"
                  }}>
                  <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Pending'}</Text>
                </TouchableOpacity>
              </View>
            </View>


          </View>

        </View>
        <Text style={{ fontSize: 16, borderBottomWidth: 1, paddingVertical: 10 }}>Social Badges</Text>

        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
            <View style={{ flex: 1 }}>
              {/* <Image
                resizeMode='cover'
                style={styles.imageView1}
                // source={require("../../../assets/undraw_winners_ao2o.png")}
                source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/kyc.png' }}
              /> */}
              <SvgUri
                style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                width={60}
                height={50}
                uri={"https://theffy.com/newtheffy/assets/img/badges/facebook.svg"}
              // svgImages.techni}
              />
            </View>
            <View style={{ flexDirection: 'column', flex: 2 }}>
              <Text style={{ fontWeight: 'bold' }}>Facebook</Text>
              <Text style={{ fontSize: 12 }}>Connect your Facebook profile to build your online social reputation.</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <TouchableOpacity
                onPress={() => {

                }}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginHorizontal: 5,
                  borderRadius: 5, backgroundColor: "#69c4ff"
                }}>
                <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <View style={{ flex: 1 }}>
                {/* <Image
                  resizeMode='cover'
                  style={styles.imageView1}
                  // source={require("../../../assets/undraw_winners_ao2o.png")}
                  source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/id-card.png' }}
                /> */}
                <SvgUri
                  style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                  width={60}
                  height={50}
                  uri={"https://theffy.com/newtheffy/assets/img/badges/twitter.svg"}
                // svgImages.techni}
                />
              </View>
              <View style={{ flexDirection: 'column', flex: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Twitter</Text>
                <Text style={{ fontSize: 12 }}>Connect your Twitter profile to build your online social reputation.</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {

                  }}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    borderRadius: 5, backgroundColor: "#69c4ff"
                  }}>
                  <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <View style={{ flex: 1 }}>
                {/* <Image
                  resizeMode='cover'
                  style={styles.imageView1}
                  // source={require("../../../assets/undraw_winners_ao2o.png")}
                  source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/kyc.png' }}
                /> */}
                <SvgUri
                  style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                  width={60}
                  height={50}
                  uri={"https://theffy.com/newtheffy/assets/img/badges/linkedin.svg"}
                // svgImages.techni}
                />
              </View>
              <View style={{ flexDirection: 'column', flex: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Linkedin</Text>
                <Text style={{ fontSize: 12 }}>Connect your professional Linkedin profile to build your online social reputation.</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {

                  }}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    borderRadius: 5, backgroundColor: "#69c4ff"
                  }}>
                  <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <View style={{ flex: 1 }}>

                  <SvgUri
                    style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                    width={60}
                    height={50}
                    uri={"https://theffy.com/newtheffy/assets/img/badges/instagram.svg"}
                  // svgImages.techni}
                  />
                  {/* <Image
                    resizeMode='cover'
                    style={styles.imageView1}
                    // source={require("../../../assets/undraw_winners_ao2o.png")}
                    source={{ uri: 'https://theffy.com/newtheffy/assets/img/badges/id-card.png' }}
                  /> */}
                </View>
                <View style={{ flexDirection: 'column', flex: 2 }}>
                  <Text style={{ fontWeight: 'bold' }}>Instagram</Text>
                  <Text style={{ fontSize: 12 }}>Connect your professional Instagram profile to build your online social reputation.</Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 5,
                      borderRadius: 5, backgroundColor: "#69c4ff"
                    }}>
                    <Text style={[styles.appButtonText, { color: "#fff", }]}>{'Add'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const updateUserInfoApi = () => {

    setLoader(true);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("user_name", user.user_name);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("address", user.address);
    formData.append("email", user.email);
    formData.append("contact", user.contact);
    // formData.append("password", userData.password);
    formData.append("about", user.about);
    formData.append("rate", user.rate);
    formData.append("dob", user.dob);
    formData.append("post_task", user.post_task);
    formData.append("earn_money", user.earn_money);
    formData.append("facebook", user.facebook);
    formData.append("twitter", user.twitter);
    formData.append("instagram", user.instagram);
    formData.append("linkedin", user.linkedin);
    // formData.append("channel", userData.channel);
    //formData.append("active", userData.active);
    //formData.append("ext", userData.ext);
    //formData.append("country_code", userData.country_code);
    //formData.append("phone_number", userData.phone_number);
    // formData.append("mobile", userData.mobile);
    // formData.append("account_type", userData.account_type);
    // formData.append("account_status", userData.account_status);
    // formData.append("profile_pic", userData.profile_pic);
    // formData.append("picture_url", userData.picture_url);
    // formData.append("remember_token", userData.remember_token);
    formData.append("pick_lat", user.pick_lat);
    formData.append("pick_lng", user.pick_lng);
    //formData.append("bank_holder", userData.bank_holder);
    // formData.append("bank_ac", userData.bank_ac);
    //  formData.append("paypal_link", userData.paypal_link);
    // formData.append("stripe_link", userData.stripe_link);
    // formData.append("institution", userData.institution);
    // formData.append("transit", userData.transit);
    // formData.append("ids_copy", userData.ids_copy);
    // formData.append("licence_copy", userData.licence_copy);
    //  formData.append("inquiry_id", userData.inquiry_id);
    //  formData.append("keys", userData.keys);
    //  formData.append("oauth_provider", userData.oauth_provider);
    //  formData.append("oauth_uid", userData.oauth_uid);
    // formData.append("status", userData.status);
    // formData.append("otp", userData.otp);
    // formData.append("refercode", userData.refercode);
    //  formData.append("refer", userData.refer);
    //  formData.append("referstatus", userData.referstatus);
    //  formData.append("emailverify", userData.emailverify);
    //  formData.append("mobileverify", userData.mobileverify);
    // formData.append("licenceverify", userData.licenceverify);
    //  formData.append("paymentverify", userData.paymentverify);
    //  formData.append("slug", userData.slug);
    //  formData.append("created_at", userData.created_at);
    //  formData.append("updated_at", userData.updated_at);
    console.log(formData, "formData error.response.data");

    setLoader(true);

    Api.postApi(formData, "profile_update")
      .then((response) => {
        console.log(JSON.stringify(response), "profile_updateprofile_update");
        if (response.status === 200) {
          debugger
          setLoader(false)
          if (response.data.error === 'true') {
            // alert(response.data.message)
            setLoader(false)

            ToastComponent.ErrorToaster(response.data.message);

            return
          }
          getUserInfo();
          ToastComponent.SuccessToaster("User Profile Updated Successfully");
          // navigation.navigate("TaskDetails");
        }

      })
      .catch((error) => {
        setLoader(false);
        // setErrorMsg(error)
        ToastComponent.ErrorToaster('error')
        console.log(error, "response error.response.data");
        console.log(error, "status.response.dastatusta");

      });

  };

  return (
    <>
      {!userInfo ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Please Register Or Login </Text>
      </View> :
        showLoader ? <Loader /> :
          <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safearea}>
              <ScrollView style={styles.scrollView}
                horizontal={false}

              >

                <View style={styles.subView}>
                  <ScrollView style={styles.scrollView}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >

                    <TouchableOpacity
                      onPress={() => {
                        setUrl('get_ActivePostByUser');
                      }}
                      style={url == 'get_ActivePostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                      <Text style={url == 'get_ActivePostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Account'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setUrl('get_InprogressPostByUser');

                      }}
                      style={url == 'get_InprogressPostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                      <Text style={url == 'get_InprogressPostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Verification'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setUrl('get_CompletePostByUser');

                      }}
                      style={url == 'get_CompletePostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                      <Text style={url == 'get_CompletePostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Payment Methods'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setUrl('get_ExpiredPostByUser');

                      }}
                      style={url == 'get_ExpiredPostByUser' ? [styles.appButtonContainer, { backgroundColor: "#72C2E7" }] : [styles.appButtonContainer, { backgroundColor: "#CCEFFF" }]}>
                      <Text style={url == 'get_ExpiredPostByUser' ? [styles.appButtonText, { color: "#fff" }] : [styles.appButtonText, { color: "#949798" }]}>{'Badges'}</Text>
                    </TouchableOpacity>


                  </ScrollView>

                </View>
                {url === "get_ActivePostByUser" && accountRender()}
                {url === "get_InprogressPostByUser" && verificationRender()}
                {url === "get_CompletePostByUser" && paymentMethodRender()}
                {url === "get_ExpiredPostByUser" && badgesRender()}

              </ScrollView>
            </SafeAreaView>
          </>
      }</>
  );
};

const styles = StyleSheet.create({
  safearea: { flex: 1, backgroundColor: '#ffffff' },
  mainView: { flex: 1 },
  subView: { flexDirection: 'row', justifyContent: 'space-between', height: 100, alignItems: 'center', },
  touchableOpacity: { justifyContent: 'center' },
  touchableView: { justifyContent: 'space-between', alignItems: 'center', flex: 1, margin: 5, paddingHorizontal: 5, paddingVertical: 10 },
  subView2: { flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center', },
  touchableView2: { justifyContent: 'space-between', alignItems: 'center', margin: 5, paddingHorizontal: 5, paddingVertical: 5, },
  textView: { justifyContent: 'center', textAlign: 'center', color: "black" },
  textView1: { justifyContent: 'center', textAlign: 'center', marginLeft: 10 },
  mobileView: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'flex-start',
    marginHorizontal: 10,
    flex: 1
  },
  mobileView1: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'flex-start',
    marginHorizontal: 10,

  },
  imageView: { width: 100, height: 100, margin: 10, },
  imageView1: { width: 60, height: 50, margin: 10, },
  imageView2: { width: '50%', height: 100, margin: 10, },
  textStyle: { marginVertical: 10, fontWeight: 'bold', color: '#5a5a5a' },

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
  appButtonContainer: {
    // elevation: 2,
    // width: '100%',
    // backgroundColor: '#69c4ff',
    // borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    //flex: 1
  },
  appButtonContainer1: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,

  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    padding: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonText1: {
    fontSize: 10,
    color: '#fff',
    padding: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

});

function mapStateToProps(state) {
  return {
    userInfo: state.userData
  }
}
export default connect(mapStateToProps)(MyAccountPage);


import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Button,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {SvgXml, SvgUri} from 'react-native-svg';
import svgImages from '../../../components/svg/allSvg';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import Api from '../../../utils/Api';
import Loader from '../../../components/Loader/Loader';
import Toaster from '../../../components/ToastComponent/Toaster';

const ChatScreen = props => {
  const {navigation} = props;
  console.log(navigation, 'navigation');
  const {userInfo, chatData} = navigation.state.params;
  const [chatList, setChatList] = useState([]);
  const [getChatResponce, setGetChatResponce] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [msg, setMsg] = useState();
  const [acceptTitle, setAcceptTitle] = useState(false);
  const [rejectTitle, setRejectTitle] = useState(false);
  const [acceptRejectPost, setAcceptRejectPost] = useState(false);
  const [adminError, setAdminError] = useState(false);

  const aceptPost = () => {
    debugger;
    setLoader(true);

    const formData = new FormData();
    formData.append('chat_id', chatData && chatData.chat_id);
    formData.append('user_id', userInfo.id);
    Api.postApi(formData, 'accept_post')
      .then(response => {
        if (response.status === 200) {
          setLoader(false);
          console.log(response.data, 'aceptedPost');
          Toaster.SuccessToaster(response.data.message);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };
  const rejectPost = () => {
    debugger;
    setLoader(true);

    const formData = new FormData();
    formData.append('chat_id', chatData && chatData.chat_id);
    formData.append('user_id', userInfo.id);
    Api.postApi(formData, 'reject_post')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data, 'reject_post');
          Toaster.SuccessToaster(response.data.message);
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };

  const sendMsg = () => {
    setLoader(true);

    const formData = new FormData();
    formData.append('chat_id', chatData && chatData.chat_id);
    formData.append('user_id', userInfo.id);

    formData.append('msg', msg);
    Api.postApi(formData, 'insert_message')
      .then(response => {
        if (response.status === 200) {
          setMsg('');
          getChatList1();
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };

  const getChatList1 = () => {
    // debugger;
    setTimeout(() => {
      //  alert('ok')
      getChatList1();
      //////////////////////////
      //   setLoader(true);

      const formData = new FormData();

      formData.append('chat_id', chatData && chatData.chat_id);
      formData.append('jobseeker_id', chatData && chatData.jobseeker);
      formData.append('employee_id', chatData && chatData.employee);
      Api.postApi(formData, 'get_chat')
        .then(response => {
          console.log(response.data.data, 'Get msg list from chat');
          console.log(response.data, 'Get all responce list from chat');
          console.log(response.data.chat.accept, 'Get all accept');
          // console.log(userData, "userdata from chat");
          if (response.status === 200) {
            debugger;
            setChatList(response.data.data);
            setGetChatResponce(response.data);
            if (
              response.data.chat.accept === '1' &&
              response.data.chat.reject === '1'
            ) {
              setAcceptRejectPost(true);
            } else if (
              response.data.chat.accept === '2' &&
              response.data.chat.reject === '2'
            ) {
              setAdminError(true);
            } else if (response.data.chat.accept === '2') {
              setAcceptTitle(true);
            } else if (response.data.chat.reject === '2') {
              setRejectTitle(true);
            }
          }
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          console.log(error, 'error');

          if (error.response.data) {
            Toaster.ErrorToaster('Please Contact to Admin');
            navigation.navigate('chatHome', {
              userInfo: props.userInfo,
            });
          }
        });

      /////////////////////////
    }, 4000);
  };

  useEffect(() => {
    setLoader(true);

    getChatList1();
  }, []);

  function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex: 1, backgroundColor: '#ebf3f9'}}>
            <View style={{backgroundColor: '#fff'}}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                    }}>
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
                      // navigation.navigate('PostTask1');
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,

                        textAlign: 'right',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      $100
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      flex: 3,
                      fontSize: 16,

                      textAlign: 'left',
                      color: '#4c6992',
                      fontWeight: 'bold',
                    }}>
                    Offer :$85
                  </Text>

                  {userInfo.post_task === 'yes' ? (
                    acceptRejectPost ? (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor: '#28a745',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                          }}>
                          <TouchableOpacity
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              aceptPost();
                            }}>
                            <Icon
                              name="ios-thumbs-up"
                              size={30}
                              color={'#ffffff'}
                            />
                            <Text
                              style={{
                                fontSize: 12,

                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                paddingHorizontal: 5,
                              }}>
                              {'Accept'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor: '#dc3545',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                          }}>
                          <TouchableOpacity
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              rejectPost();
                            }}>
                            <Text
                              style={{
                                fontSize: 12,

                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                paddingHorizontal: 5,
                              }}>
                              {'Reject'}
                            </Text>
                            <Icon
                              name="ios-thumbs-down"
                              size={30}
                              color={'#ffffff'}
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          backgroundColor: acceptTitle ? '#28a745' : '#dc3545',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}>
                        <View
                          style={{
                            marginLeft: 4,
                            marginRight: 4,
                          }}>
                          <Icon
                            name={
                              acceptTitle
                                ? 'ios-thumbs-up'
                                : rejectTitle
                                ? 'ios-thumbs-down'
                                : 'ios-sad'
                            }
                            size={26}
                            color={'#ffffff'}
                          />
                        </View>
                        <View
                          style={{
                            marginRight: 10,
                            backgroundColor: 'tamato',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,

                              textAlign: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                              paddingHorizontal: 5,
                            }}>
                            {rejectTitle
                              ? 'Rejected'
                              : acceptTitle
                              ? 'Acepted'
                              : adminError
                              ? 'Contact Admin'
                              : 'Contact Admin'}
                          </Text>
                        </View>
                      </View>
                    )
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          backgroundColor: '#28a745',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          //   borderBottomLeftRadius: 10,
                          marginRight: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,

                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            paddingHorizontal: 5,
                          }}>
                          Status: {buttonTitle}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
            <ScrollView style={{marginBottom: 50}}>
              {chatList &&
                chatList.map((item, index) => {
                  return item.user_id == 8 ? (
                    <View style={styles.itemView}>
                      <TouchableHighlight style={[styles.profileImgContainer]}>
                        <Image
                          source={require('../../../assets/profile.jpg')}
                          style={styles.profileImg}
                        />
                      </TouchableHighlight>
                      <View
                        style={{
                          height: '100%',
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 5,
                          flex: 1,
                          borderTopLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            paddingHorizontal: 5,
                            fontWeight: 'bold',
                          }}>
                          {item.msg}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.itemView}>
                      <View
                        style={{
                          height: '100%',
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 5,
                          flex: 1,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            paddingHorizontal: 5,
                            fontWeight: 'bold',
                          }}>
                          {item.msg}
                        </Text>
                      </View>
                      <TouchableHighlight style={[styles.profileImgContainer]}>
                        <Image
                          source={require('../../../assets/Usericon.png')}
                          style={styles.profileImg}
                        />
                      </TouchableHighlight>
                    </View>
                  );
                })}
            </ScrollView>

            {acceptTitle && (
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 0,
                  flex: 1,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  height: 50,
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Icon
                  name="ios-camera"
                  size={30}
                  style={{width: '10%'}}
                  color={'#69c4ff'}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setMsg}
                  value={msg}
                  placeholder="Type Something Here....."
                />

                <TouchableHighlight
                  style={{
                    width: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={sendMsg}>
                  <Icon
                    name="ios-send"
                    size={30}
                    style={{}}
                    color={'#69c4ff'}
                  />
                </TouchableHighlight>
              </View>
            )}
          </SafeAreaView>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 60,
    width: 60,
    borderRadius: 40,
  },
  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  input: {
    height: 40,
    width: '80%',
    // margin: 12,

    color: 'black',

    paddingHorizontal: 10,
    borderColor: '#0ba6ff',
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
  itemView1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 5,

    backgroundColor: 'transparent',
    flex: 3,
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerView: {
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ChatScreen;

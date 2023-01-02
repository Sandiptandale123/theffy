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
import {connect} from 'react-redux';
import svgImages from '../../../components/svg/allSvg';
import Api from '../../../utils/Api';
import Loader from '../../../components/Loader/Loader';
import GlobalConstants from '../../../utils/Constants';
import WithoutLoginPage from '../../../components/withoutLogInPage/withoutLoginPage';

// https://getstream.io/chat/get_started/
// rakesh@yopmail.com
// 123456123456
// const client = StreamChat.getInstance("dz5f4d5kzrue");
// await client.setUser({
//   id: "twilight-shadow-0",
//   name: "twilight",
//   image: "https://bit.ly/2u9Vc0r",
// }, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidHdpbGlnaHQtc2hhZG93LTAiLCJleHAiOjE2MjUyMTcxMzl9.JgP1sFaL6Ny-LValr1cFa4ShYmu-7OUCythU7YgpsxQ"); // token generated server side
// return client;
const ChatPage = props => {
  const {navigation, userInfo} = props;
  const [chatList, setChatList] = useState([]);
  const [showLoader, setLoader] = useState(false);

  const getChatList = () => {
    setLoader(true);
    if (!userInfo) {
      return;
    }
    const formData = new FormData();

    formData.append('user_id', userInfo && userInfo.id);
    formData.append('employee_id', userInfo && userInfo.id);
    debugger;
    Api.postApi(formData, 'get_chat_list')
      .then(response => {
        console.log(JSON.stringify(response), 'get_chat_list');
        if (response.status === 200) {
          setChatList(response.data.data);
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

  useEffect(() => {
    getChatList();
  }, []);

  // let svgAllImages = [
  //     svgImages.home,
  //     svgImages.techni,
  //     svgImages.carRepair,
  //     svgImages.deliveryMan,
  //     svgImages.gardening,
  //     svgImages.furniture,
  //     svgImages.webGraphic,
  //     svgImages.petCare,
  //     svgImages.handyMan,
  //     svgImages.marketing
  // ];

  const renderChatItem = ({item, index}) => {
    console.log(
      GlobalConstants.svgImageUrl + item.jobseeker_image,
      'GlobalConstants.svgImageUrl + item.user_image ',
      item,
    );
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => {
          // debugger
          navigation.navigate('ChatScreen', {
            userInfo: props.userInfo,
            chatData: item,
          });
        }}>
        <TouchableHighlight
          style={[
            styles.profileImgContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          {/* <SvgXml width={50}
                        height={50}
                        xml={svgAllImages[index % svgAllImages.length]}
                    //  source={{ uri: "https://theffy.com/assets/images/logo.jpg" }}

                    /> */}
          <Image
            style={{
              width: 120,
              height: '100%',
              resizeMode: 'center',
              padding: 5,
            }}
            // source={{uri:GlobalConstants.imageBaseUrl+i'tem.file'}}
            source={{uri: GlobalConstants.svgImageUrl + item.jobseeker_image}}
          />
        </TouchableHighlight>
        <View style={styles.itemView1}>
          <Text style={styles.itemText}>{item.employee_name}</Text>
          <Text style={{color: '#69c4ff', fontSize: 10}}>{item.day}</Text>
          <Text style={{fontSize: 12}}>Offer : {item.offer}</Text>
          <Text style={{fontSize: 12}}>status : {item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {!userInfo ? (
        <WithoutLoginPage />
      ) : showLoader ? (
        <Loader />
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ebf3f9'}}>
          <FlatList
            data={chatList}
            renderItem={renderChatItem}
            key={chatList}
            style={{marginHorizontal: 10}}
            keyExtractor={(item, index) => index + 'chaIt'}
          />
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 50,
    width: 40,

    flex: 1,
  },
  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  itemView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 5,

    backgroundColor: 'transparent',
    flex: 3,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}
export default connect(mapStateToProps)(ChatPage);

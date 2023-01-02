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
import WithoutLoginPage from '../../../components/withoutLogInPage/withoutLoginPage';

const ReferPage = props => {
  const {navigation, userInfo} = props;
  const [referList, setReferList] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [cash, setCash] = useState('');
  const [referCode, setReferCode] = useState('');

  const getChatList = () => {
    setLoader(true);

    const formData = new FormData();

    formData.append('id', userInfo && userInfo.id);
    Api.postApi(formData, 'refer_friend')
      .then(response => {
        console.log(response, 'get_chat_list');
        if (response.status === 200) {
          setReferList(response.data.data);
          setCash(response.data.TheffyCash);
          setReferCode(response.data.refercode);
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
    userInfo && getChatList();
  }, []);

  return (
    <>
      {!userInfo ? (
        <WithoutLoginPage />
      ) : showLoader ? (
        <Loader />
      ) : (
        <>
          <StatusBar barStyle="dark-content" />

          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#ebf3f9',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: '80%',
                height: 200,
                resizeMode: 'center',
                padding: 5,
              }}
              // source={{uri:GlobalConstants.imageBaseUrl+i'tem.file'}}
              source={{
                uri: 'https://theffy.com/newtheffy/assets/img/refer-and-earn-theffy.png',
              }}
            />
            <Text style={{fontSize: 14, marginVertical: 5, fontWeight: 'bold'}}>
              Your Referal Code
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginVertical: 10,
                fontWeight: 'bold',
                padding: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderRadius: 5,
              }}>
              {referCode}
            </Text>

            <Text style={{fontSize: 12, marginVertical: 5, width: '80%'}}>
              When your friends sign up using the referral code, They get $10.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                marginHorizontal: 20,
              }}>
              <Text style={{fontSize: 16, flex: 3}}>{'TheffyCash : '}</Text>
              <Text
                style={{
                  fontSize: 16,
                  flex: 1,
                  borderRadius: 5,
                  padding: 5,
                  backgroundColor: 'green',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {cash}00
              </Text>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 40,
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
export default connect(mapStateToProps)(ReferPage);

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  SectionList,
  Button,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Api from '../../../utils/Api';
import Loader from '../../../components/Loader/Loader';
import WithoutLoginPage from '../../../components/withoutLogInPage/withoutLoginPage';

const Payment = props => {
  const {navigation, userInfo} = props;
  const [showLoader, setLoader] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    userInfo && paymentDataApi();
  }, []);

  const paymentDataApi = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('user_id', userInfo.id);
    debugger;
    Api.postApi(formData, 'payment_data')
      .then(response => {
        if (response.status === 200) {
          if (response.data.error === 'true') {
            setMsg(response.data.message);
            setErrorMsg(true);
          } else {
            setPaymentData(response.data.data);
          }
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
  return (
    <>
      {!userInfo ? (
        <WithoutLoginPage />
      ) : showLoader ? (
        <Loader />
      ) : errorMsg ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>{msg}</Text>
        </View>
      ) : (
        <SafeAreaView>
          <View>
            <Text>Wallet</Text>
            <Text>Total Credit:{'$6747'}</Text>
            <Text>Total Debit: {'$4551'}</Text>
          </View>

          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[style.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            data={paymentData}
            renderItem={({item, index, separators}) => (
              <View style={{marginTop: 10}}>
                <TouchableHighlight
                  key={item.key}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}
                  style={{backgroundColor: 'white', padding: 20}}>
                  <View style={{backgroundColor: 'white'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Title: {item.title}
                    </Text>
                    <Text style={{fontSize: 14}}>
                      Payment Amount: {item.amount}
                    </Text>
                    <Text style={{fontSize: 12}}>Type: {item.type}</Text>
                    <Text style={{fontSize: 12}}>Payout Type: {item.type}</Text>
                    <Text style={{fontSize: 12}}>
                      Status: {item.comment_status}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
};
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(Payment);

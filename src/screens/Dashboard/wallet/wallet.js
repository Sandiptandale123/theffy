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
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Api from '../../../utils/Api';
import Loader from '../../../components/Loader/Loader';
import WithoutLoginPage from '../../../components/withoutLogInPage/withoutLoginPage';

const Wallet = props => {
  const {navigation, userInfo} = props;

  const [showLoader, setLoader] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    userInfo && walletDataApi();
  }, []);

  const walletDataApi = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('user_id', userInfo.id);
    debugger;
    Api.postApi(formData, 'wallet_data')
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
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}>
            <Text style={[styles.textView]}>Balance Available:</Text>
            <Text
              style={[
                styles.textView,
                {
                  color: 'white',
                  backgroundColor: 'green',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                },
              ]}>
              $ 9
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text style={{borderBottomWidth: 1, paddingVertical: 10}}>
              Request New Payout
            </Text>
            <Text style={{paddingVertical: 10}}>Enter Amount</Text>
            <TextInput
              style={styles.input}
              // onChangeText={setPassword}
              //  value={password}
              placeholder="Amount you want to Payout"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 10,
                height: 50,
                paddingHorizontal: 10,
                backgroundColor: '#ebf6e0',
              }}>
              <Text>Express Fee: $10</Text>
              <Text>Total Amount: $1010</Text>
            </View>

            <Text style={{paddingVertical: 10}}>Payout Type</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <Text style={[styles.textView1, {backgroundColor: '#69c4ff'}]}>
                Express payout{' '}
              </Text>
              <Text
                style={[styles.textView1, {borderRadius: 5, borderWidth: 1}]}>
                Regular payout
              </Text>
              <Text
                style={[styles.textView1, {color: '#69c4ff', fontSize: 10}]}>
                Regular Payment Date
              </Text>
            </View>

            <Text style={{paddingVertical: 10}}>Payment Methods</Text>
            <TextInput
              style={styles.input}
              // onChangeText={setPassword}
              //  value={password}
              placeholder="Select Method"
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                // navigation.navigate('Register');
              }}>
              <Text style={styles.loginButtonText}>Request</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
              <Text style={{fontWeight: 'bold'}}>Search</Text>
              <TextInput
                style={styles.input1}
                // onChangeText={setPassword}
                //  value={password}
                placeholder=""
              />
            </View>

            <View style={styles.subView}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableText}>Date</Text>
                  </View>
                  {paymentData &&
                    paymentData.length > 0 &&
                    paymentData.map((item, index) => {
                      return (
                        <Text style={styles.tableText}>{item.created}</Text>
                      );
                    })}
                </View>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableText}>Payment Amount</Text>
                  </View>
                  {paymentData &&
                    paymentData.length > 0 &&
                    paymentData.map((item, index) => {
                      return (
                        <Text style={styles.tableText}>{item.payment_amt}</Text>
                      );
                    })}
                </View>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableText}>Payout Type</Text>
                  </View>
                  {paymentData &&
                    paymentData.length > 0 &&
                    paymentData.map((item, index) => {
                      return (
                        <Text style={styles.tableText}>{item.payout_type}</Text>
                      );
                    })}
                </View>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableText}>Payment Method</Text>
                  </View>
                  {paymentData &&
                    paymentData.length > 0 &&
                    paymentData.map((item, index) => {
                      return (
                        <Text style={styles.tableText}>
                          {item.payment_method}
                        </Text>
                      );
                    })}
                </View>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableText}>Status</Text>
                  </View>
                  {paymentData &&
                    paymentData.length > 0 &&
                    paymentData.map((item, index) => {
                      return (
                        <Text style={styles.tableText}>{item.status}</Text>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
            {/* <View style={[styles.subView, {backgroundColor: '#f2f2f2'}]}>
              <Text>No matching records found</Text>
            </View>
            <View style={styles.subView}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Text style={styles.tableText}>Date</Text>
                <Text style={styles.tableText}>Payment Amount</Text>
                <Text style={styles.tableText}>Payout Type</Text>
                <Text style={styles.tableText}>Payment Method</Text>
                <Text style={styles.tableText}>Status</Text>
              </ScrollView>
            </View> */}
            {/* <Text>
              Showing 0 to 0 of 0 entries (filtered from 5 total entries)
            </Text> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={[styles.loginButton, {backgroundColor: '#fff'}]}
                onPress={() => {
                  // navigation.navigate('Register');
                }}>
                <Text
                  style={[
                    styles.loginButtonText,
                    {
                      color: '#000',
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                    },
                  ]}>
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.loginButton, {backgroundColor: '#fff'}]}
                onPress={() => {
                  // navigation.navigate('Register');
                }}>
                <Text
                  style={[
                    styles.loginButtonText,
                    {
                      color: '#000',
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                    },
                  ]}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>*/}
          </View>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  textView: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textView1: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 5,
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 50,
    alignItems: 'center',
    borderWidth: 1,
  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  loginButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#0ba6ff',
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 4,

    alignSelf: 'flex-start',
  },
  tableText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    borderRightWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  input1: {
    height: 40,
    width: '40%',
    // margin: 12,
    marginBottom: 12,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: '#0ba6ff',
  },
  tableHeader: {
    width: '100%',
    backgroundColor: '#69C4FF',
  },
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}
export default connect(mapStateToProps)(Wallet);

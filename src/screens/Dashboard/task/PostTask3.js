import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Button,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from '../../../utils/Api';
import {SvgXml, SvgUri} from 'react-native-svg';
import svgImages from '../../../components/svg/allSvg';
import {Radio, CheckBox} from 'native-base';
import Toaster from '../../../components/ToastComponent/Toaster';
import {ProgressBar, Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import useForceUpdate from 'use-force-update';
import colors from '../../../utils/colors';
const PostTask3 = props => {
  const {navigation} = props;
  const {postTwoData, isEdit} = navigation.state.params;

  const [isEmailEnter, setIsEmailEnter] = useState(true);
  const [postTitle, setPostTitle] = useState({
    totalPrice: '',
    hourse: '',
    hoursePrice: '',
  });
  const forceUpdate = useForceUpdate();
  const handleClick = () => {
    //   alert('I will re-render now.');
    forceUpdate();
  };

  useEffect(() => {
    if (isEdit) {
      setPostTitle({
        ...postTitle,
        totalPrice: props && props.taskInfo && props.taskInfo.totalamt,
        hourse: props && props.taskInfo && props.taskInfo.hours,
        hoursePrice: props && props.taskInfo && props.taskInfo.hoursamt,
      });
      handleClick();
    } else {
      //   if (props.userInfo) {
      //     setPostTitle({ ...postTitle, user_id: props.userInfo.id });
      //   }
    }
  }, []);

  const [isCost, setIsCost] = useState(true);
  const [show, setShow] = useState(false);
  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            height: 100,
            backgroundColor: '#edf2f8',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <ProgressBar progress={1} color={'#69c4ff'} />
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <ProgressBar progress={1} color={'#69c4ff'} />
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <ProgressBar progress={1} color={'#69c4ff'} />
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <ProgressBar progress={1} color={'#ffffff'} />
          </View>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          What is Your Budget?
        </Text>
        <Text style={{fontSize: 12, marginVertical: 5, marginHorizontal: 10}}>
          Please enter the price you're comfortable to pay to get your task
          done. Taskers will use this as a guide for how much to offer.
        </Text>

        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              margin: 10,
              //   justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <CheckBox checked={isCost} onPress={() => {
                            setIsCost(!isCost)
                        }} /> */}
            <TouchableOpacity
              value={isCost}
              onPress={() => {
                setIsCost(!isCost);
                setShow(!show);
              }}>
              <Icon
                // name={'ios-radio-button-on'}
                name={
                  show === false
                    ? 'ios-radio-button-on'
                    : 'ios-radio-button-off'
                }
                size={30}
                color={'#69c4ff'}
              />
            </TouchableOpacity>

            {/* <Radio selected={false} style={{ height: 50, width: 30 }} /> */}
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>
              Total
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              margin: 10,
              //   justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <CheckBox checked={!isCost} onPress={() => {
                            setIsCost(!isCost)
                        }} /> */}
            <TouchableOpacity
              value={!isCost}
              onPress={() => {
                setIsCost(!isCost);
                setShow(!show);
              }}>
              <Icon
                // name={'ios-radio-button-on'}
                name={
                  show === false
                    ? 'ios-radio-button-off'
                    : 'ios-radio-button-on'
                }
                size={30}
                color={'#69c4ff'}
              />
            </TouchableOpacity>
            {/* <Radio selected={false} style={{ height: 50, width: 30 }} /> */}
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>
              Hourly Rate
            </Text>
          </View>
        </View>
        {isCost ? (
          <View style={styles.hPrice}>
            <TextInput
              keyboardType="number-pad"
              onChangeText={value => {
                setPostTitle({...postTitle, totalPrice: value});
              }}
              placeholder="$ Total Amount"
              value={postTitle.totalPrice}
              style={styles.textInputStyle}
            />
          </View>
        ) : (
          <View
            style={[
              styles.hPrice,
              {flexDirection: 'row', justifyContent: 'flex-start'},
            ]}>
            <TextInput
              onChangeText={value => {
                setPostTitle({...postTitle, hourse: value});
              }}
              placeholder={'Total Hour'}
              value={postTitle.hourse}
              style={[styles.textInputStyle1, {margin: 10, flex: 1}]}
            />

            <TextInput
              onChangeText={value => {
                setPostTitle({...postTitle, hoursePrice: value});
              }}
              placeholder="$ Per Hour Rate"
              value={postTitle.hoursePrice}
              style={[styles.textInputStyle1, {margin: 10, flex: 1}]}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.nextButton}>
        <TouchableOpacity
          onPress={() => {
            let postThreeData = postTwoData;
            if (
              postTitle.totalPrice ||
              (postTitle.hoursePrice && postTitle.hourse)
            ) {
              postThreeData.totalamt = postTitle.totalPrice;
              postThreeData.hours = postTitle.hourse;
              postThreeData.hoursamt = postTitle.hoursePrice;
              postThreeData.amounttype = isCost ? 'Total ' : 'Hourly';

              navigation.navigate('PostTask4', {
                postThreeData: postThreeData,
                isEdit,
              });
            } else {
              Toaster.ErrorToaster('Please select price ');
              return;
            }
            // RegisterAPI()
          }}
          style={styles.loginButton}>
          <Text style={styles.appButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  hPrice: {flex: 1, height: 100, margin: 10},
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
  },

  safearea: {flex: 1, backgroundColor: '#ffffff'},
  categoryItemView: {
    backgroundColor: '#edf2f8',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  scrollViewIconBox: {
    backgroundColor: '#EDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 89,
    margin: 10,
    borderRadius: 4,
  },
  imageMainView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    padding: 10,
    margin: 10,
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: '#69c4ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    //flex: 1
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
  icon: {
    color: '#FE9D2B',
  },
  textInputStyle: {
    height: 40,
    color: 'black',
    borderColor: '#69c4ff',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle1: {
    height: 40,
    borderColor: '#69c4ff',
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  nextButton: {marginTop: 'auto', marginBottom: 20},
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
    taskInfo: state.taskInfo,
  };
}
export default connect(mapStateToProps)(PostTask3);

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
  Switch,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from '../../../utils/Api';
import {SvgXml, SvgUri} from 'react-native-svg';
import svgImages from '../../../components/svg/allSvg';
import {Radio, CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import useForceUpdate from 'use-force-update';
import ToastComponent from '../../../components/ToastComponent/Toaster';
import {ProgressBar, Colors} from 'react-native-paper';
import colors from '../../../utils/colors';
const PremiumPost = props => {
  const {navigation} = props;
  const {postForData, postThreeData} = navigation.state.params;
  const [showLoader, setLoader] = useState(false);
  const [packages, setPackages] = useState([]);
  const [theffyCashSelected, setTheffyCashSelected] = useState(false);
  const [showErorMsg, setErrorMsg] = useState('');
  const [show, setShow] = useState(false);
  const loderTimer = async () => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };
  useEffect(() => {
    setErrorMsg('');
  }, []);

  useEffect(() => {
    console.log(
      JSON.stringify(postForData),
      JSON.stringify(postThreeData),
      'postForData, postThreeData',
    );
    getPackages();
  }, []);
  const getPackages = () => {
    debugger;
    Api.getApi('packages')
      .then(response => {
        console.log(response, 'packages');
        if (response.status === 200) {
          let list = [];
          response.data &&
            response.data.data &&
            response.data.data.map((e, i) => {
              e.isSelected = false;
              list.push(e);
            });
          console.log(list, 'list');

          setPackages(list);
        }
      })
      .catch(error => {
        // setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };

  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    //   alert('I will re-render now.');
    forceUpdate();
  };

  const createPostApi = () => {
    let radio = '';
    let tags = '';
    if (packages) {
      packages.map((p, i) => {
        p.isSelected === true && (radio = radio + p.id + ',');
      });
    }
    if (postThreeData.tags) {
      postThreeData.tags.map((t, i) => {
        tags = tags + t + ',';
      });
    }
    let tasker = '';
    if (!postForData.makePublic && postForData.userSelected) {
      postForData.userSelected.map((t, i) => {
        tasker = tasker + t + ',';
      });
    }
    setErrorMsg('');

    setErrorMsg('');
    setLoader(true);
    loderTimer();
    const formData = new FormData();
    formData.append('user_id', postThreeData.user_id);
    formData.append('category', postThreeData.category);
    formData.append('category_name', postThreeData.category_name);
    formData.append('title', postThreeData.title);
    formData.append('file[]', postThreeData.file);
    formData.append('descp', postThreeData.descp);
    formData.append('musthave', postThreeData.musthave);
    formData.append('tags', tags);
    formData.append('amounttype', postThreeData.amounttype);
    formData.append('totalamt', postThreeData.totalamt);
    formData.append('hours', postThreeData.hours);
    formData.append('hoursamt', postThreeData.hoursamt);
    formData.append('locationtype', postForData.locationType);
    formData.append('location', postForData.location);
    formData.append('asap', postForData.asap ? 'on' : 'off');
    formData.append('date', postForData.date);
    formData.append('time', postForData.time);
    formData.append('mobile_s', postForData.s_m ? 'on' : 'off');
    formData.append('mobile', postForData.mobile);
    formData.append('email_s', postForData.s_e ? 'on' : 'off');
    formData.append('email', postForData.email);
    formData.append('publicly_s', postForData.makePublic ? 'on' : 'off');
    formData.append('tasker', tasker);
    formData.append('radio', radio);
    formData.append('pick_lat', postThreeData.pick_lat);
    formData.append('pick_lng', postThreeData.pick_lng);
    console.log(formData, 'formData error.response.data');

    setLoader(true);

    Api.postApi(formData, 'employee_post')
      .then(response => {
        console.log(JSON.stringify(response), 'employee_post');
        if (response.status === 200) {
          if (response.data.error === 'true') {
            // alert(response.data.message)
            ToastComponent.ErrorToaster(response.data.message);
            return;
          }
          ToastComponent.SuccessToaster('Post Created Successfully');
          navigation.navigate('TaskDetails');
        }
      })
      .catch(error => {
        setLoader(false);
        // setErrorMsg(error)
        ToastComponent.ErrorToaster('error');
        console.log(error, 'response error.response.data');
        console.log(error, 'status.response.dastatusta');
      });
  };
  let bgcolors = ['#e9f7fe', '#fbfadd', '#ebf6e0', 'lightgrey'];
  return (
    <ScrollView style={styles.mainView}>
      <View>
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
            <ProgressBar progress={1} color={'#69c4ff'} />
          </View>
        </View>

        <Text style={styles.textView}>Premium Service</Text>
        <Text style={styles.subTextView}>
          You can optionally select some upgrades to get the best results.
        </Text>

        {packages &&
          packages.map((p, i) => {
            return (
              <View style={{backgroundColor: bgcolors[i], marginVertical: 5}}>
                <View style={styles.subView}>
                  <View style={styles.typeView}>
                    {/* <CheckBox checked={p.isSelected} color="green" onPress={() => {
                                        packages[i].isSelected = !p.isSelected;
                                        handleClick()
                                    }} /> */}
                    <TouchableOpacity
                      value={p.isSelected}
                      onPress={() => {
                        packages[i].isSelected = !p.isSelected;
                        handleClick();

                        //  setShow(!show)
                      }}>
                      <Icon
                        // name={'ios-radio-button-on'}
                        name={
                          packages[i].isSelected === false
                            ? 'ios-radio-button-off'
                            : 'ios-radio-button-on'
                        }
                        size={30}
                        color={
                          packages[i].isSelected === false
                            ? ' red'
                            : colors.mainColor
                        }
                      />
                    </TouchableOpacity>

                    <Text style={styles.textTitle}>{p.title}</Text>
                  </View>
                  <Text style={styles.textTitle}>
                    ${p.price} for {p.days} days
                  </Text>
                </View>
                <Text style={styles.subTextView}>{p.description}</Text>
              </View>
            );
          })}
        <View style={{backgroundColor: bgcolors[3], marginVertical: 5}}>
          <TouchableOpacity
            // value={p.isSelected}
            onPress={() => {
              setTheffyCashSelected(!theffyCashSelected);
              console.log('theffy cash selected', theffyCashSelected);
            }}>
            <View style={styles.subView}>
              <View style={styles.typeView}>
                <Icon
                  name={
                    theffyCashSelected === false
                      ? 'ios-radio-button-off'
                      : 'ios-radio-button-on'
                  }
                  size={30}
                  color={
                    theffyCashSelected === false ? ' red' : colors.mainColor
                  }
                />

                <Text style={styles.textTitle}>{'THEFFYCASH'}</Text>
              </View>
              <Text style={styles.textTitle}>${'00'}</Text>
            </View>
            <Text style={[styles.subTextView, {marginBottom: 7}]}>
              {'You can pay 100% of your referral cash using any plan'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabView}>
          <TouchableOpacity
            style={[styles.touchView, {backgroundColor: '#9acd32'}]}
            onPress={() => {
              navigation.navigate('TaskDetails');
            }}>
            <Text style={styles.touchText}>Pay Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchView, {backgroundColor: '#69c4ff'}]}
            onPress={() => {
              createPostApi();
            }}>
            <Text style={styles.touchText}>Skip & Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainView: {backgroundColor: '#ffffff', flex: 1, paddingHorizontal: 10},
  textView: {fontSize: 20, fontWeight: 'bold', margin: 5},
  subView: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  typeView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subTextView: {margin: 5},
  textTitle: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#617b9f',
  },
  tabView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchView: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
});
export default PremiumPost;

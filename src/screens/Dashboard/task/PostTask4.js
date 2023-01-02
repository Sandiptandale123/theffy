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
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from '../../../utils/Api';
import {SvgXml, SvgUri} from 'react-native-svg';
import svgImages from '../../../components/svg/allSvg';
import {Radio, CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import useForceUpdate from 'use-force-update';
// import DatePicker from 'react-native-date-picker'
import {TimePicker} from 'react-native-simple-time-picker';
import DatePicker from 'react-native-datepicker';
import Toaster from '../../../components/ToastComponent/Toaster';
import {connect} from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
import {ProgressBar, Colors} from 'react-native-paper';
import colors from '../../../utils/colors';

const PostTask4 = props => {
  const {navigation} = props;
  const {postThreeData, isEdit} = navigation.state.params;
  const [date, setDate] = useState();
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);

  const [postTitle, setPostTitle] = useState({
    title: '',
    location: '',
    locationType: 'location',
    date: '',
    time: '',
    mobile: '',
    s_m: false,
    s_e: false,
    email: '',
    makeItPublic: '',
    userSelected: '',
    makePublic: false,
    asap: false,
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedItems, setLectedItems] = useState([]);
  const onSelectedItemsChange = selectedItems => {
    debugger;
    setLectedItems(selectedItems);
  };
  const toggleSwitch = e => {
    if (e === 'm') {
      setPostTitle({...postTitle, s_m: !postTitle.s_m});
    } else if (e === 'e') {
      setPostTitle({...postTitle, s_e: !postTitle.s_e});
    } else if (e === 'a') {
      setPostTitle({...postTitle, asap: !postTitle.asap});
    } else {
      setPostTitle({...postTitle, makePublic: !postTitle.makePublic});
    }
  };

  const handleChange = value => {
    setHours(value.hours);
    setMinutes(value.minutes);
    setPostTitle({...postTitle, time: value.hours + ':' + value.minutes});
  };

  useEffect(() => {
    getCategory();
  }, []);

  let listOfCat = [];
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setPostTitle({
      ...postTitle,
      locationType: selectLoactionType ? 'location' : 'workremote',
    });
  }, [selectLoactionType]);

  useEffect(() => {
    console.log('printtime', hours, minutes);
    let timeValue = +hours + ':' + minutes;
    console.log('timervalue', timeValue);
    setPostTitle({...postTitle, time: timeValue});
  }, [selectLoactionType]);

  const getCategory = () => {
    debugger;
    Api.getApi('users')
      .then(response => {
        console.log(response, 'users');
        if (response.status === 200) {
          let list = [];
          response.data &&
            response.data.data &&
            response.data.data.map((e, i) => {
              e.isSelected = false;
              e.name = e.user_name;
              list.push(e);
            });
          console.log(list, 'list');

          setCategoryList(list);
        }
      })
      .catch(error => {
        // setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };
  const [selectedTaskers, setTasker] = useState([]);

  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    //   alert('I will re-render now.');
    forceUpdate();
  };
  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          debugger;
          let activeIndex1 = ([] = selectedTaskers);
          activeIndex1.push(item.id);
          // setTags([])
          if (item.isSelected) {
            item.isSelected = false;
          } else {
            item.isSelected = true;
          }
          handleClick();

          setTasker(activeIndex1);
          console.log(activeIndex1, 'activeIndex');
        }}
        style={{
          margin: 5,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: item.isSelected === true ? '#69c4ff' : '#edf2f8',
          padding: 5,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: item.isSelected === true ? 'white' : '#000',
            fontSize: 14,
            padding: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          {item.user_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const [selectLoactionType, setType] = useState(true);
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
            <ProgressBar progress={1} color={'#69c4ff'} />
          </View>
        </View>

        <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
          Task Location
        </Text>
        <Text style={{fontSize: 12, marginHorizontal: 10}}>
          Where do you need it done?
        </Text>

        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            {/* <CheckBox checked={selectLoactionType} onPress={() => {
                            setType(!selectLoactionType);

                        }} /> */}
            <TouchableOpacity
              value={selectLoactionType}
              onPress={() => {
                setType(!selectLoactionType);
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
              At your Location
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
            {/* <CheckBox checked={!selectLoactionType} onPress={() => {
                            setType(!selectLoactionType)
                        }} /> */}
            <TouchableOpacity
              value={!selectLoactionType}
              onPress={() => {
                setType(!selectLoactionType);
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
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>
              Work Remotely
            </Text>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          {selectLoactionType && (
            <View style={styles.locationInput}>
              <TextInput
                style={{
                  height: 40,
                  width: '90%',
                  borderRadius: 4,
                  color: 'black',
                }}
                onChangeText={value => {
                  setPostTitle({...postTitle, location: value});
                }}
                placeholder="Enter Your Location"
                value={postTitle.location}
              />
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  //setViewPass(!viewPass)
                }}>
                <Icon name={'ios-locate'} size={30} color={'#9f9c9c'} />
              </TouchableOpacity>
            </View>
          )}

          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              When do you need it done?
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
                ASAP
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={postTitle.asap ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  toggleSwitch('a');
                }}
                value={postTitle.asap}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              //   alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {/* <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="datetime"
                        /> */}
            <DatePicker
              style={{width: '60%'}}
              date={postTitle.date}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              minDate={new Date()}
              maxDate="2030-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setPostTitle({...postTitle, date: date});
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', margin: 10, flex: 1}}>
              Select Time:
            </Text>
            <View style={{flex: 2, borderWidth: 1, borderRadius: 5}}>
              <TimePicker
                mode="dropdown"
                value={{hours, minutes}}
                onChange={handleChange}
              />
            </View>
          </View>

          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Mobile No.
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, margin: 10, color: '#767577'}}>
                Show
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={postTitle.s_m ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  toggleSwitch('m');
                }}
                value={postTitle.s_m}
              />
            </View>
          </View>

          {postTitle.s_m && (
            <TextInput
              keyboardType="phone-pad"
              onChangeText={value => {
                setPostTitle({...postTitle, mobile: value});
              }}
              maxLength={10}
              placeholder="Enter Your Phone Number"
              value={postTitle.mobile}
              style={[styles.textInputStyle, styles.inputColor]}
            />
          )}
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Email Id
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, margin: 10, color: '#767577'}}>
                Show
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={postTitle.s_e ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  toggleSwitch('e');
                }}
                value={postTitle.s_e}
              />
            </View>
          </View>
          {postTitle.s_e && (
            <TextInput
              keyboardType="email-address"
              onChangeText={value => {
                setPostTitle({...postTitle, email: value});
              }}
              placeholder="getwebinfotech@gmail.com"
              value={postTitle.email}
              style={[styles.textInputStyle, styles.inputColor]}
            />
          )}
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Make it Publicly?
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, margin: 10, color: '#767577'}}>
                Show
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={postTitle.makePublic ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  toggleSwitch('u');
                }}
                value={postTitle.makePublic}
              />
            </View>
          </View>

          {postTitle.makePublic && (
            <View style={{marginHorizontal: 10}}>
              <MultiSelect
                hideTags
                items={categoryList}
                uniqueKey="id"
                // ref={(component) => { multiSelect = component }}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Select Taskers"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#69c4ff"
                submitButtonText="Submit"
              />
            </View>
          )}

          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <FlatList
              data={postTitle.makeItPublic ? categoryList : []}
              renderItem={renderCategoryItem}
              showsHorizontalScrollIndicator={false}
              key={categoryList}
              // horizontal={true}
              numColumns={2}
              style={{marginHorizontal: 10}}
              keyExtractor={(item, index) => index + 'id'}
            />
          </View>

          <Text style={{fontSize: 12, marginVertical: 5, marginHorizontal: 10}}>
            If they choose a specifc tasker, a message is sent with full details
            to the tasker
          </Text>

          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              onPress={() => {
                // if (!postTitle.mobile) {
                //     Toaster.ErrorToaster('Please add mobile ');
                //     return
                // }
                // if (!postTitle.email) {
                //     Toaster.ErrorToaster('Please add email id ');
                //     return
                // }
                if (!postTitle.date) {
                  Toaster.ErrorToaster('Please add Date  ');
                  return;
                }
                let data = postTitle;
                data.userSelected = selectedItems;
                navigation.navigate('PremiumPost', {
                  postForData: data,
                  postThreeData: postThreeData,
                });
                // alert("Post Create Successfully")
                // RegisterAPI()
              }}
              style={styles.loginButton}>
              <Text style={styles.appButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: '#ffffff'},
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
  inputColor: {
    color: 'black',
  },
  locationInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#69c4ff',
    borderRadius: 5,
    color: 'black',
    borderWidth: 1,
    margin: 10,
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
    borderColor: '#69c4ff',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
    taskInfo: state.taskInfo,
  };
}
export default connect(mapStateToProps)(PostTask4);

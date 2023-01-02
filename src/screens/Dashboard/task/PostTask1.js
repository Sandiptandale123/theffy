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
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from '../../../utils/Api';
import {SvgXml, SvgUri} from 'react-native-svg';
import svgImages from '../../../components/svg/allSvg';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import ToastComponent from '../../../components/ToastComponent/Toaster';
import useForceUpdate from 'use-force-update';
import Toaster from '../../../components/ToastComponent/Toaster';
import {ProgressBar, Colors} from 'react-native-paper';
import Loader from '../../../components/Loader/Loader';
import GlobalConstants from '../../../utils/Constants';
import colors from '../../../utils/colors';

const PostTask1 = props => {
  const [index, setIndex] = useState(0);
  const {navigation} = props;
  const [showLoader, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const {isEdit} = navigation.state.params;
  console.log('isEditisEditisEdit', isEdit);
  const [postContent, setPostContent] = useState({
    user_id: 0,
    categoryId: '',
    category_name: '',
    title: '',
    file: '',
    descp: '',
    musthave: '',
    tags: '4,5',
    amounttype: '',
    totalamt: '0',
    hours: '0',
    hoursamt: '',
    locationtype: '',
    location: '',
    asap: '',
    date: '',
    time: '',
    mobile_s: '',
    mobile: '',
    email_s: '',
    email: '',
    publicly_s: '',
    tasker: '',
    radio: '',
    pick_lat: 100,
    pick_lng: 100,
  });

  useEffect(() => {
    if (isEdit) {
      console.log('propstaskInfo', JSON.stringify(props.taskInfo));
      console.log(
        'printpropsdata',
        props && props.taskInfo && props.taskInfo.title,
      );
      console.log('printfile', props && props.taskInfo && props.taskInfo.file);
      debugger;
      setPostContent({
        ...postContent,
        user_id: props && props.taskInfo && props.taskInfo.user_id,
        categoryId: props && props.taskInfo && props.taskInfo.category,
        category_name: props && props.taskInfo && props.taskInfo.category_name,
        title: props && props.taskInfo && props.taskInfo.title,
        file: props && props.taskInfo && props.taskInfo.file,
        descp: '',
        musthave: '',
        tags: '4,5',
        amounttype: '',
        totalamt: '0',
        hours: '0',
        hoursamt: '',
        locationtype: '',
        location: '',
        asap: '',
        date: '',
        time: '',
        mobile_s: '',
        mobile: '',
        email_s: '',
        email: '',
        publicly_s: '',
        tasker: '',
        radio: '',
        pick_lat: 100,
        pick_lng: 100,
      });
      setActiveIndex(props.taskInfo.category);
      setCatID(props.taskInfo.category);

      handleClick();
    } else {
      if (props.userInfo) {
        setPostContent({...postContent, user_id: props.userInfo.id});
      }
    }
  }, []);

  const getCategory = () => {
    setLoader(true);
    Api.getApi('category')
      .then(response => {
        console.log(response, 'category');
        setLoader(false);
        if (response.status === 200) {
          let list = [];
          response.data &&
            response.data.data &&
            response.data.data.map((e, i) => {
              e.isSelected = false;
              list.push(e);
            });
          console.log(list, 'list');

          setCategoryList(list);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };
  useEffect(() => {
    requestCameraPermission();
  });

  useEffect(() => {
    getCategory();
    console.log(props.userInfo);
  }, []);

  let svgAllImages = [
    svgImages.home,
    svgImages.techni,
    svgImages.carRepair,
    svgImages.deliveryMan,
    svgImages.gardening,
    svgImages.furniture,
    svgImages.webGraphic,
    svgImages.petCare,
    svgImages.handyMan,
    svgImages.marketing,
  ];

  useEffect(() => {
    console.log(postContent, 'postContent');
  }, [postContent]);
  const [activeIndex, setActiveIndex] = useState('-1');
  const [catID, setCatID] = useState('');

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Theffy Camera Permission',
          message:
            'Theffy needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }

      const grantedFile = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Theffy File Manager Permission',
          message:
            'Theffy needs access to your storage' +
            'so you can select awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (grantedFile === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the file');
      } else {
        console.log('file permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderCategoryItem = ({item, index}) => {
    let array = item.image.split('.')[1];
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveIndex(item.id);
          setCatID(item.id);
          setPostContent({...postContent, categoryId: item.id});

          setPostContent({...postContent, category_name: item.name});
        }}
        style={{
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: activeIndex === item.id ? '#69c4ff' : '#edf2f8',

          width: 120,
          height: 110,
        }}>
        {item.image && array === 'svg' ? (
          <SvgUri
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            width={35}
            height={35}
            uri={GlobalConstants.svgImageUrl + item.image}
            // svgImages.techni}
          />
        ) : (
          <Image
            style={{height: 40, width: 40, backgroundColor: '#EDF2F8'}}
            source={{uri: GlobalConstants.svgImageUrl + item.image}}
          />
        )}

        {/* <SvgUri
          style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center' }}
          width={35}
          height={35}
          uri={GlobalConstants.svgImageUrl + item.image}
        // svgImages.techni}
        /> */}

        {/* <SvgXml
          style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center' }}
          width={35}
          height={35}
          xml={svgAllImages[index % svgAllImages.length]}
        // svgImages.techni}
        /> */}
        <Text
          numberOfLines={1}
          style={{
            color: activeIndex === item.id ? 'white' : '#000',
            fontSize: 12,
            marginTop: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderImages = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: 120,
          height: 110,
        }}>
        <Image
          style={styles.image}
          source={
            postContent && postContent.file
              ? item
              : require('../../../assets/Teacher.png')
          }
        />
      </TouchableOpacity>
    );
  };

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
  const [imageArray, setImageArray] = useState([]);
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
          let tarray = imageArray;
          tarray.push(image);
          setImageArray(tarray);
          setPostContent({...postContent, file: image});
          handleClick();
        }
      }
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView>
        <View style={{backgroundColor: '#ffffff', flex: 1}}>
          {showLoader && <Loader />}
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
              <ProgressBar progress={1} color={'#ffffff'} />
            </View>
            <View style={{flex: 1, marginHorizontal: 5}}>
              <ProgressBar progress={1} color={'#ffffff'} />
            </View>
            <View style={{flex: 1, marginHorizontal: 5}}>
              <ProgressBar progress={1} color={'#ffffff'} />
            </View>
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
            Choose Categories
          </Text>

          <View>
            <FlatList
              data={categoryList}
              renderItem={renderCategoryItem}
              showsHorizontalScrollIndicator={false}
              key={categoryList}
              horizontal={true}
              style={{marginHorizontal: 10}}
              keyExtractor={(item, index) => index + 'id'}
            />
          </View>
          <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              What should we name your task?
            </Text>

            <TextInput
              onChangeText={value => {
                setPostContent({...postContent, title: value});
              }}
              placeholder="For Example: Clean my house "
              value={postContent.title}
              style={styles.textInputStyle}
            />

            <Text style={{fontSize: 16, fontWeight: 'bold', margin: 10}}>
              Upload Pictures (Optional)
            </Text>
            <Text
              style={{fontSize: 12, marginVertical: 5, marginHorizontal: 10}}>
              You can upload JPG/JPEG/PNG/TXT/PDF
            </Text>

            <FlatList
              data={imageArray}
              renderItem={renderImages}
              showsHorizontalScrollIndicator={false}
              key={imageArray}
              horizontal={true}
              style={{marginHorizontal: 10}}
              keyExtractor={(item, index) => index + 'id'}
            />

            <View style={styles.imageMainView}>
              <View style={styles.imageMainViewRight}>
                <TouchableOpacity
                  onPress={() => {
                    imageSelect();
                  }}>
                  {isEdit ? (
                    <Image
                      style={[styles.imageUpload, styles.border]}
                      source={{
                        uri:
                          GlobalConstants.imageBaseUrl1 + props.taskInfo.file,
                      }}
                      // source={props && props.taskInfo && props.taskInfo.file ? item : require("../../../assets/Teacher.png")}
                    />
                  ) : (
                    <Image
                      style={[styles.imageUpload, styles.border]}
                      source={require('../../../assets/upload_image.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <TouchableOpacity
                onPress={() => {
                  debugger;
                  if (postContent.title && catID) {
                    if (!postContent.file) {
                      Toaster.ErrorToaster('Please select Image');
                      return;
                    }
                    let postOnedata = postContent;
                    postOnedata.category = catID;
                    navigation.navigate('PostTask2', {
                      postOnedata: postOnedata,
                      categoryList: categoryList,
                      isEdit,
                    });
                  } else {
                    Toaster.ErrorToaster('Please Select category and title');
                  }
                }}
                style={styles.loginButton}>
                <Text style={styles.appButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  imageMainView: {
    display: 'flex',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    // padding: 10,
    // margin: 10
  },
  imageMainViewLeft: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageMainViewRight: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // aspectRatio:1,
    // backgroundColor:"orange"
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },

  imageUpload: {
    height: '100%',
    // width: '100%',
    // resizeMode:'contain',
    aspectRatio: 1,
  },
  border: {
    borderColor: 'black',
    borderWidth: 1,
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

  icon: {
    color: '#FE9D2B',
  },
  textInputStyle: {
    height: 44,
    borderColor: '#69c4ff',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    color: 'black',
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
    taskInfo: state.taskInfo,
  };
}
export default connect(mapStateToProps)(PostTask1);
// export default PostTask1;

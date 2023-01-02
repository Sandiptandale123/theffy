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
import Icon from 'react-native-vector-icons/Ionicons';
import useForceUpdate from 'use-force-update';
import Toaster from '../../../components/ToastComponent/Toaster';
import GlobalConstants from '../../../utils/Constants';
import {ProgressBar, Colors} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../../utils/colors';
const PostTask2 = props => {
  const {navigation} = props;
  const {postOnedata, categoryList, isEdit} = navigation.state.params;
  const [catID, setCatID] = useState('');

  console.log('isEditisEditisEdit', isEdit);
  const [postTitle, setPostTitle] = useState({
    descp: '',
    mustHave: '',
  });

  let activeIndex = [];
  let listOfCat = ([] = categoryList);
  const [selectedTags, setTags] = useState([]);

  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    //   alert('I will re-render now.');
    forceUpdate();
  };

  useEffect(() => {}, [activeIndex]);

  useEffect(() => {
    if (isEdit) {
      setPostTitle({
        ...postTitle,
        descp: props && props.taskInfo && props.taskInfo.descp,
        mustHave: props && props.taskInfo && props.taskInfo.musthave,
      });
      handleClick();
    } else {
      //   if (props.userInfo) {
      //     setPostTitle({ ...postTitle, user_id: props.userInfo.id });
      //   }
    }
  }, []);

  const renderCategoryItem = ({item, index}) => {
    let array = item.image.split('.')[1];
    return (
      <TouchableOpacity
        onPress={() => {
          debugger;
          let activeIndex1 = ([] = selectedTags);
          activeIndex1.push(item.id);
          // setTags([])
          if (item.isSelected) {
            item.isSelected = false;
          } else {
            item.isSelected = true;
          }
          handleClick();

          setTags(activeIndex1);
          console.log(activeIndex1, 'activeIndex');
          // setCatID(item.id);
          // setPostContent({ ...postContent, categoryId: item.id });

          // setPostContent({ ...postContent, category_name: item.name });
        }}
        style={{
          margin: 5,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: item.isSelected === true ? '#69c4ff' : '#edf2f8',
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
        {/* <SvgXml
                    style={{ justifyContent: "center", alignSelf: 'center' }}
                    width={35}
                    height={35}
                    xml={svgAllImages[index % svgAllImages.length]}
                // svgImages.techni}
                /> */}

        {/* <SvgUri
                    style={{ justifyContent: "center", alignSelf: 'center' }}
                    width={35}
                    height={35}
                    uri={GlobalConstants.svgImageUrl + item.image}
                // svgImages.techni}
                /> */}

        <Text
          numberOfLines={1}
          style={{
            color: item.isSelected === true ? 'white' : '#000',
            fontSize: 12,
            marginTop: 5,
            justifyContent: 'center',

            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // const [postContent, setPostContent] = useState(postOnedata)

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView>
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
            <ProgressBar progress={1} color={'#ffffff'} />
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <ProgressBar progress={1} color={'#ffffff'} />
          </View>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          Describe your task in detail
        </Text>
        <TextInput
          multiline={true}
          onChangeText={value => {
            setPostTitle({...postTitle, descp: value});
          }}
          placeholder="Start typing here...."
          value={postTitle.descp}
          style={styles.textInputStyle}
        />
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 10,
            backgroundColor: 'transparent',
          }}>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              //   marginLeft: 10,
            }}>
            Add Must have
          </Text>
        </View>
        <TextInput
          onChangeText={value => {
            setPostTitle({...postTitle, mustHave: value});
          }}
          placeholder="For Example: Clean my house "
          value={postTitle.mustHave}
          style={[
            styles.textInputStyle,
            {height: 44, textAlignVertical: 'center'},
          ]}
        />
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              margin: 10,
              backgroundColor: 'transparent',
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              Add Tags/Keywords
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              Selected Tags : {selectedTags.length}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginBottom: 20,
            }}>
            <FlatList
              data={listOfCat}
              renderItem={renderCategoryItem}
              showsHorizontalScrollIndicator={false}
              key={listOfCat}
              horizontal={true}
              style={{marginHorizontal: 10}}
              keyExtractor={(item, index) => index + 'id'}
            />
          </View>

          <View style={styles.nextButton}>
            <TouchableOpacity
              onPress={() => {
                debugger;
                let postTwoData = postOnedata;
                if (postTitle.descp) {
                  postTwoData.tags = selectedTags;
                  postTwoData.musthave = postTitle.mustHave;
                  postTwoData.descp = postTitle.descp;
                  navigation.navigate('PostTask3', {
                    postTwoData: postTwoData,
                    isEdit,
                  });
                } else {
                  Toaster.ErrorToaster('Please Insert Description ');
                }

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
    marginVertical: 10,
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
    height: 120,
    borderColor: '#69c4ff',
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  nextButton: {marginTop: 'auto', marginBottom: 20},
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
    taskInfo: state.taskInfo,
  };
}
export default connect(mapStateToProps)(PostTask2);

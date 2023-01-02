import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Api from '../../../utils/Api';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';

import Loader from '../../../components/Loader/Loader';
import GlobalConstants from '../../../utils/Constants';
import { Appbar, Avatar } from 'react-native-paper';

const BrowsePage = (props) => {
  const { navigation } = props;
  const [featureList, setFeatureList] = useState([]);
  const [otherPostList, setOtherPostList] = useState([]);

  const [featureListIndex, setFeatureListIndex] = useState(500);
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPostS(1);
    getPostOther(2);
  }, []);
  const getPostS = id => {
    const formData = new FormData();
    formData.append('limit', featureListIndex);
    formData.append('offset', 0);
    formData.append('package_id', id);
    Api.postApi(formData, 'get_postby_packages')
      .then(response => {
        console.log(response, 'get_postby_packages');

        if (response.status === 200) {
          if (id === 1) {
            setFeatureList(response.data.data);
            setLoader(false);
          }
        }
      })
      .catch(error => {
        // setLoader(false);
        console.log(error, 'error');
        setLoader(false);
      });
  };

  const getPostOther = id => {
    const formData = new FormData();
    formData.append('limit', featureListIndex);
    formData.append('offset', 0);
    formData.append('package_id', id);
    Api.postApi(formData, 'get_postby_packages')
      .then(response => {
        console.log(response, 'get_postby_packages');
        debugger;
        if (response.status === 200) {
          setOtherPostList(response.data.data);
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'error');
      });
  };

  const renderTaskItem = ({ item, index }) => {
    var imageArray = [];
    if (item.file) {
      imageArray = item.file.split(',');
    }
console.log(GlobalConstants.imageBaseUrl1 + item.file )
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate("TaskDetails1", { item: item, pageName: "browsePage" })
      }}>
        <View style={styles.scrollViewCardBox}>
          <View style={styles.imageCardView}>
            <Image
              style={styles.imageCard}
              source={imageArray ? { uri: GlobalConstants.imageBaseUrl1 + imageArray[0] } : require("../../../assets/images/benefits-cleaning.jpg")}
            // source={{uri:'https://theffy.com/newtheffy/assets/img/' + imageArray[0]}}

            />
            <View style={styles.viewLable}>
              <Text style={styles.textLable}>{'Urgently'}</Text>
            </View>

            <View style={styles.cardBottomView}>
              <View style={styles.cardBottomViewLeft}>
                <View style={styles.cardTitle}>
                  <Text numberOfLines={1} style={styles.cardTitleText}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescriptionText}>
                    {item.category_name}
                  </Text>

                  <Text style={styles.locDate}>
                    <Icon name={'ios-navigate'} size={15} color="black" />{' '}
                    {item.locationtype}
                  </Text>
                  <Text style={styles.locDate}>
                    <Icon name={'ios-calendar'} size={15} color="black" />{' '}
                    {item.date}
                  </Text>
                </View>
              </View>
              <View style={styles.cardBottomViewRight}>
                <Text style={styles.cardPrice}>${item.totalamt}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      // <View style={styles.scrollViewCardBox}>
      //   <Text
      //     numberOfLines={2}
      //     style={{
      //       backgroundColor: 'red',
      //       textAlign: 'center',
      //       padding: 2,
      //       color: 'white',
      //       fontSize: 10,
      //       borderTopRightRadius: 8,
      //       borderTopLeftRadius: 8,
      //       width: '100%',
      //     }}>
      //     {'Urgently'}
      //   </Text>
      //   <View style={styles.imageCardView}>
      //     <View style={styles.cardBottomView}>
      //       <View style={styles.cardBottomViewLeft}>
      //         <View style={styles.cardTitle}>
      //           <Text numberOfLines={2} style={styles.cardTitleText}>
      //             {item.title}
      //           </Text>
      //           <Text style={styles.cardDescriptionText}>
      //             {item.category_name}
      //           </Text>
      //         </View>
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             justifyContent: 'space-between',
      //             marginHorizontal: 5,
      //             marginTop: 5,
      //           }}>
      //           <Text style={styles.locDate}>
      //             <Icon name={'ios-navigate'} size={15} color="black" />{' '}
      //             {item.locationtype}
      //           </Text>
      //           <Text style={styles.locDate}>
      //             <Icon name={'ios-calendar'} size={15} color="black" />{' '}
      //             {item.date}
      //           </Text>
      //         </View>
      //         <View style={styles.cardBottomViewRight}>
      //           <Text style={styles.cardPrice}>${item.totalamt}</Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>
      // </View>
    );
  };

  const renderItemOther = ({ item, index }) => {
    var imageArray = [];
    if (item.file) {
      imageArray = item.file.split(',');
    }

    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate("TaskDetails1", { item: item, pageName: "browsePage" })
      }}>
        <View style={styles.allJobCardMain}>
          <View style={styles.allJobCardImage}>
            {/* <Image
            style={styles.allJobImage}
            source={require('../../../assets/theffySource/browestask.jpg')}
            // source={{uri:}}
          /> */}
            <View style={styles.viewHighlight}>
              <Text style={styles.textHighlight}>{'Highlight'}</Text>
            </View>
          </View>
          <View style={styles.allJobCardFirstColumn}>
            <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
              <Text style={{ width: 20 }}>
                <Icons name="male" size={22} color="#69C4FF" />
                {/* <Icon name={''} size={15} color="black" /> */}
              </Text>

              <Text numberOfLines={2} style={{ marginLeft: 10, fontWeight: "700", fontSize: 14 }}>
                {item.title}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 20 }}>
                <Icons name="bookmark" size={22} color="#69C4FF" />
              </Text>

              <Text style={{ marginLeft: 10 }}>{item.category_name}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={[styles.locDate, styles.locDateMargin]}>
                <Icon name={'ios-navigate'} size={15} color="black" />{' '}
              </Text>
              <Text style={{ marginLeft: 10 }}>{item.locationtype}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={[styles.locDate, styles.locDateMargin]}>
                <Icon name={'ios-calendar'} size={15} color="black" />
              </Text>
              <Text style={{ marginLeft: 8 }}> {item.date}</Text>
            </View>

            {/* <View style={{marginLeft:10, marginTop:6, flexDirection:"row"}}>
                      <Text >{"13 Offer | "}</Text>
                      <Text style={{color:"#94C758"}}>{"Open"}</Text>
                    </View> */}
          </View>
          <View style={styles.allJobCardSecondColumn}>
            <Text
              style={{
                marginBottom: 6,
                fontSize: 18,
                fontWeight: '700',
                color: '#4C6992',
              }}>
              ${item.totalamt}
            </Text>
            <Avatar.Image
              // style={styles.avtarImage}
              size={40}
              source={require('../../../assets/profile.jpg')}
            // source={userData.profile_pic}
            />
            <Text style={{ marginTop: 6, fontSize: 14, fontWeight: '700' }}>
              {'Anna Watson'}
            </Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>{'3 days ago'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      // <View style={styles.scrollViewCardBoxOther}>
      //   <Text
      //     numberOfLines={2}
      //     style={{
      //       backgroundColor: 'green',
      //       textAlign: 'center',
      //       padding: 2,
      //       color: 'white',
      //       fontSize: 10,
      //       borderTopRightRadius: 8,
      //       borderTopLeftRadius: 8,
      //       width: '100%',
      //     }}>
      //     {'Highlight'}
      //   </Text>
      //   <View style={styles.imageCardView}>
      //     <View style={styles.cardBottomView}>
      //       <View style={styles.cardBottomViewLeft}>
      //         <View style={styles.cardTitle}>
      //           <Text numberOfLines={2} style={styles.cardTitleText}>
      //             {item.title}
      //           </Text>
      //           <Text style={styles.cardDescriptionText}>
      //             {item.category_name}
      //           </Text>
      //         </View>
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             justifyContent: 'space-between',
      //             marginHorizontal: 5,
      //             marginTop: 5,
      //           }}>
      //           <Text style={styles.locDate}>
      //             <Icon name={'ios-navigate'} size={15} color="black" />{' '}
      //             {item.locationtype}
      //           </Text>
      //           <Text style={styles.locDate}>
      //             <Icon name={'ios-calendar'} size={15} color="black" />{' '}
      //             {item.date}
      //           </Text>
      //         </View>
      //         <View style={styles.cardBottomViewRight}>
      //           <Text style={styles.cardPrice}>${item.totalamt}</Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>
      // </View>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {showLoader ? (
        <Loader />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.scrollView}>
            <View style={styles.seeMoreTextView}>
              <Text style={styles.seeMoreText}>Feature Jobs</Text>
              <Text style={styles.seeMoreText}> More</Text>
            </View>

            <View style={{ backgroundColor: 'white' }}>
              <FlatList
                data={featureList}
                horizontal={true}
                renderItem={renderTaskItem}
                showsHorizontalScrollIndicator={false}
                key={featureList}
                showsHorizontalScrollIndicator={false}
                key={featureList}
                style={{ margin: 10 }}
                keyExtractor={(item, index) => index + 'idfi'}
              />
            </View>
          </View>
          <View style={styles.scrollView}>
            <View style={styles.seeMoreTextView}>
              <Text style={styles.seeMoreText}>All Jobs</Text>
              <Text style={styles.seeMoreText}> More</Text>
            </View>

            <View
              style={{
                backgroundColor: '#EBF3F9',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <FlatList
                data={otherPostList}
                renderItem={renderItemOther}
                showsHorizontalScrollIndicator={false}
                key={otherPostList}
                showsHorizontalScrollIndicator={false}
                key={otherPostList}
                // style={{marginBottom: 40}}
                keyExtractor={(item, index) => index + 'otherPostList'}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  seeMoreTextView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  scrollViewBottom: {
    backgroundColor: '#EFF8FC',
    padding: 10,
    marginTop: 10,
    marginBottom: 4,
  },

  scrollViewCardBox: {
    backgroundColor: '#EDF2F8',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 200,
    height: 120,
    margin: 10,
    borderRadius: 10,
  },
  scrollViewCardBoxOther: {
    backgroundColor: '#EDF2F8',

    alignItems: 'center',
    // width: '4%',
    // height: 140,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
  imageCard: {
    width: 150,
    height: 100,

    // aspectRatio: 1.4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottomViewLeft: {
    width: '100%',
  },
  cardTitle: {
    //   justifyContent:"center",
    //   alignItems:"center",
    paddingTop: 4,
    paddingLeft: 5,
  },
  cardTitleText: {
    fontSize: 12,
    color: 'black',
  },
  cardDescription: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescriptionText: {
    fontSize: 8,
  },
  cardBottomViewRight: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cardPrice: {
    fontSize: 12,
    marginRight: 5,
    fontWeight: 'bold',
    color: '#8DCDEB',
  },
  locDate: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: 'black',
    // marginLeft: 4,

  },
  locDateMargin: {
    width: 20,
    // backgroundColor:"blue"

  },

  scrollViewCardBox: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 200,
    height: 160,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageCard: {
    width: 200,
    height: 80,

    // aspectRatio: 1.4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottomViewLeft: {
    width: '80%',
  },
  cardTitle: {
    //   justifyContent:"center",
    //   alignItems:"center",
    paddingTop: 4,
    paddingLeft: 5,
  },
  cardTitleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardDescription: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescriptionText: {
    fontSize: 10,
    fontWeight: '400',
  },
  cardBottomViewRight: {
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
    maxWidth: 40,
    // marginVertical: 5,
    // marginHorizontal: 5,
  },
  cardPrice: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8DCDEB',
  },
  scrollViewBottom: {
    backgroundColor: '#EFF8FC',
    padding: 10,
    // marginTop: 10,
  },
  viewLable: {
    position: 'absolute',
    top: 4,
    backgroundColor: '#fff',
    right: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },

  textLable: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ED595E',
  },
  viewHighlight: {
    position: 'absolute',
    top: 8,
    backgroundColor: '#fff',
    right: 4,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
  },

  textHighlight: {
    fontSize: 14,
    fontWeight: '700',
    color: '#526E95',
  },

  allJobCardSecondColumn: {
    // backgroundColor:"orange",
    alignItems: 'center',

    marginLeft: 'auto',
    // marginRight:20,
  },
  allJobCardFirstColumn: {
    marginLeft: 6,
    width: '50%',
    // backgroundColor:"blue",
    justifyContent: 'center',
    overflow: 'hidden',
  },
  allJobCardImage: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },

  allJobImage: {
    width: 100,
    height: 100,
    padding: 10,

    // aspectRatio: 1.4,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },

  allJobCardMain: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 6,
    // paddingLeft: 14,
    width: '100%',
    marginBottom: 20,
  },
  scrollView: {
    backgroundColor: '#EBF3F9'
  },
});
export default BrowsePage;

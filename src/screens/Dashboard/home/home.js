import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SearchBar } from "react-native-elements";
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/AntDesign";
import Api from "../../../utils/Api";
import { SvgXml, SvgUri } from "react-native-svg";
import svgImages from '../../../components/svg/allSvg';
import ImageUrl from "../../../utils/imageUrl";
import { UserAction } from "../../../reduxManager";
import GlobalConstants from '../../../utils/Constants';
import { connect } from 'react-redux';
const HomePage = (props) => {
  const { navigation } = props;
  const [showLoader, setLoader] = useState(false);

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch({ search });
  };

  console.log(props.userInfo, "props.userInfoprops.userInfoprops.userInfo")
  useEffect(() => {
    getCategory()
  }, [])
  const [categoryList, setCategoryList] = useState([])

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
    svgImages.marketing
  ];

  useEffect(() => {
    console.log(GlobalConstants, "GlobalConstants");

    getPostS(1)

  }, [])
  const [featureList, setFeatureList] = useState([])

  const getPostS = (id) => {
    const formData = new FormData();
    formData.append("limit", 500);
    formData.append("offset", 0);
    formData.append("package_id", id);;
    Api.postApi(formData, "get_postby_packages")
      .then((response) => {
        console.log(response, "get_postby_packages");

        if (response.status === 200) {
          if (id === 1) {
            setFeatureList(response.data.data);
            setLoader(false)

          }
        }
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error, 'error')
        setLoader(false)


      });
  }
  const getCategory = () => {
    debugger;
    Api.getApi("category")
      .then((response) => {
        console.log(response, "category");
        if (response.status === 200) {
          setCategoryList(response.data.data)

        }
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error, 'error')

        if (error.response.data) {
        }
      });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <SearchBar
              containerStyle={{ height: 60, backgroundColor: "#fff" }}
              inputContainerStyle={{ height: 40 }}
              inputStyle={{ fontSize: 16 }}
              placeholder="Search Here..."
              onChangeText={updateSearch}
              value={search}
              lightTheme={true}
              round={true}
            />


            <View style={styles.lookingView}>
              <View style={styles.lookingViewLeft}>
                <View style={styles.lookingViewLeftTitle}>
                  <Text style={styles.lookingViewLeftTitleText}>
                    Are you looking for any Help?
                  </Text>
                  <Text style={[styles.lookingViewLeftContentText, { fontWeight: 'normal' }]}>
                    We are delighted to provide the best services
                  </Text>
                </View>

              </View>
              <View style={styles.lookingViewRight}>
                <Image
                  style={{ height: 80, width: 80, backgroundColor: '#EDF2F8' }}
                  source={require("../../../assets/logo1.png")}
                />
              </View>
            </View>

            <View style={styles.seeMoreTextView}>
              <Text style={styles.seeMoreText}>Post a Task & Get Offer</Text>
              <Text style={[styles.seeMoreText,{color:'#193863', fontFamily: 'Montserrat-Regular',}]}>See More</Text>
            </View>
            <View style={styles.scrollView}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {categoryList &&
                  categoryList.map((c, cIndex) => {
                    let array = c.image.split('.')[1]
                    return <TouchableOpacity style={styles.scrollViewIconBox} onPress={() => {
                      if (props.userInfo && props.userInfo.post_task === "yes") {

                        navigation.navigate('PostTask1', { "isEdit": false });
                      }
                      else {
                       navigation.navigate('Browse')
                      }
                    }} >

                      {c.image && array === 'svg' ? <SvgUri
                        style={{ justifyContent: "center", alignItems: 'center', alignSelf: 'center', margin: 10 }}
                        width={40}
                        height={40}
                        uri={GlobalConstants.svgImageUrl + c.image}
                      // svgImages.techni}
                      />
                        : <Image
                          style={{ height: 40, width: 40, backgroundColor: '#EDF2F8' }}
                          source={{ uri: GlobalConstants.svgImageUrl + c.image }}
                        />
                      }
                      <Text numberOfLines={1} style={styles.textCategory}>{c.name}</Text>
                    </TouchableOpacity>
                  })
                }
              </ScrollView>
            </View>

            <View
              style={[styles.middleContentView, styles.middleContentViewFirst]}
            >
              <View style={styles.middleContentViewLeft}>
                <View style={styles.middleContentViewLeftTitle}>
                  <Text style={styles.middleContentViewLeftTitleText}>
                    Events &
                  </Text>
                  <Text style={styles.middleContentViewLeftTitleText}>
                    Photography
                  </Text>
                </View>
                
                <View style={styles.middleContentViewLeftContent}>
                  <Text style={styles.middleContentViewLeftContentText}>
                    Lorem Ipsum is simply dummy text of the printing
                  </Text>
                </View>
              </View>
              <View style={styles.middleContentViewRight}>
                <Image
                  style={styles.middleContentImage}
                  source={require("../../../assets/categoriesDown/camera.png")}
                />

              </View>
            </View>

            <View
              style={[styles.middleContentView, styles.middleContentViewSecond]}
            >
              <View style={styles.middleContentViewLeft}>
                <View style={styles.middleContentViewLeftTitle}>
                  <Text style={styles.middleContentViewLeftTitleText}>
                    Delivery My
                  </Text>
                  <Text style={styles.middleContentViewLeftTitleText}>
                    Item's
                  </Text>
                </View>
                <View style={styles.middleContentViewLeftContent}>
                  <Text style={styles.middleContentViewLeftContentText}>
                    Lorem Ipsum is simply dummy text of the printing
                  </Text>
                </View>
              </View>
              <View style={styles.middleContentViewRight}>
                <Image
                  style={styles.middleContentImage}
                  source={require("../../../assets/categoriesDown/delivery-boy2.png")}
                />

              </View>
            </View>

            <View
              style={[styles.middleContentView, styles.middleContentViewFirst]}
            >
              <View style={styles.middleContentViewLeft}>
                <View style={styles.middleContentViewLeftTitle}>
                  <Text style={styles.middleContentViewLeftTitleText}>
                    Tutoring &
                  </Text>
                  <Text style={styles.middleContentViewLeftTitleText}>
                    Classes
                  </Text>
                </View>
                <View style={styles.middleContentViewLeftContent}>
                  <Text style={styles.middleContentViewLeftContentText}>
                    Lorem Ipsum is simply dummy text of the printing
                  </Text>
                </View>
              </View>
              <View style={styles.middleContentViewRight}>
                <Image resizeMode="contain"
                  style={styles.middleContentImage}
                  source={require("../../../assets/categoriesDown/Teacher2.png")}
                />

              </View>
            </View>

            <View style={styles.scrollViewBottom}>
              <Text style={styles.titleText}>Featured</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {featureList && featureList.map((item, o) => {
                  var imageArray = []
                  if (item.file) {
                    imageArray = item.file.split(',');
                  }

                  return <View style={styles.scrollViewCardBox} key={'feat' + o}>
                    <View style={styles.imageCardView}>
                      <Image resizeMode={'contain'}
                        style={styles.imageCard}
                        source={imageArray ? { uri: GlobalConstants.imageBaseUrl1 + imageArray[0] } : require("../../../assets/images/benefits-cleaning.jpg")}
                      />
                      <View style={styles.cardBottomView}>
                        <View style={styles.cardBottomViewLeft}>
                          <View style={styles.cardTitle}>
                            <Text style={styles.cardTitleText}>
                              {item.title}
                            </Text>
                            <Text style={styles.cardDescriptionText}>
                              {item.category_name}
                            </Text>
                          </View>

                        </View>
                        <View style={styles.cardBottomViewRight}>
                          <Text style={styles.cardPrice}>$ {item.totalamt}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                })

                }








              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  searchViewStyle: {
    height: 20,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 20,
    color:'#193863'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lookingView: {
    backgroundColor: "#EDF2F8",
    // height: 200,
    margin: 10,
    // paddingRight: 10,
    borderRadius: 10,
    // flexWrap:"wrap",
    padding: 10,
    flexDirection: "row",
  },
  lookingViewLeft: {
    width: "60%",
    // height: "100%",
    // backgroundColor: "red",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  lookingViewLeftTitle: {
    // height: "50%",
    //   backgroundColor:"orange",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  lookingViewLeftTitleText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    textAlign:"left",
    color:'#193863'
  },
  lookingViewLeftContent: {
    // height: "50%",
    //   backgroundColor:"orange",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  lookingViewLeftContentText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign:"left",
    color:'#193863',
  },

  lookingViewRight: {
    width: "40%",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "blue",
  },

  seeMoreTextView: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
  },
  scrollViewIconBox: {
    backgroundColor: "#EDF2F8",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 89,
    margin: 10,
    borderRadius: 4,
  },
  textCategory: {
    fontSize: 12,
    marginVertical: 5,
    fontFamily: 'Montserrat-Bold',
  },

  icon: {
    color: "#FE9D2B",
  },

  middleContentView: {
    // backgroundColor: "#E9F7FE",

    margin: 10,

    borderRadius: 10,
    // height:160,

    padding: 5,
    flexDirection: "row",
  },
  middleContentViewLeft: {
    width: "60%",

    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  middleContentViewLeftTitle: {
    justifyContent: "flex-start",
    // alignItems: "flex-start",
    marginBottom: 4,
    width: "100%",
  },
  middleContentViewLeftTitleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    textAlign: "left",
  },
  middleContentViewLeftContent: {
    justifyContent: "flex-start",
    // alignItems: "center",
    marginBottom: 4
  },

  middleContentViewLeftContentText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: "left",
    color:'#193863'

  },

  middleContentViewRight: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    // height:"100%",
    // flexWrap:"wrap"
    //backgroundColor:"orange",
  },
  middleContentImage: {
    width: '100%',
    resizeMode: "stretch",
    height: 100,
    justifyContent: "center",
    alignItems: 'center',
  },

  middleContentViewFirst: {
    backgroundColor: "#E9F7FE",
  },
  middleContentViewSecond: {
    backgroundColor: "#FFE4D0",
  },

  scrollViewBottom: {
    backgroundColor: "#EFF8FC",
    padding: 10,
    marginTop: 10,
    marginBottom: 4,
  },

  scrollViewCardBox: {
    backgroundColor: "#EDF2F8",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 180,
    height: 160,
    margin: 10,
    borderRadius: 10,
  },
  imageCard: {
    width: 180,
    height: 100,

    // aspectRatio: 1.4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardBottomView: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardBottomViewLeft: {
    flex: 3
  },
  cardTitle: {
    //   justifyContent:"center",
    //   alignItems:"center",
    paddingTop: 4,
    paddingLeft: 5,
  },
  cardTitleText: {
    fontSize: 8,
    fontFamily: 'Montserrat-Bold',
    color:'#5B5A5A'
  },
  cardDescription: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardDescriptionText: {
    fontSize: 7,
    fontFamily: 'Montserrat-Regular',
    color:'#5B5A5A'
  },
  cardBottomViewRight: {
    justifyContent: "center",
    alignItems: "center",

  },
  cardPrice: {
    fontSize: 9,
    fontFamily: 'Montserrat-Bold',
    marginRight: 5,
    color: "#72C2E7",
  },
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData
  }
}
export default connect(mapStateToProps)(HomePage);

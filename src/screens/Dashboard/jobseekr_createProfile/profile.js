import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Appbar, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ion from 'react-native-vector-icons/Ionicons';
import Api from '../../../utils/Api';
import moment from 'moment';

const Profile = props => {
  const [userData, setUserData] = useState([]);
  const [accountType, setAccountType] = useState();
  let id = 9;
  const formData = new FormData();
  formData.append('user_id', id);

  // debugger
  // console.log(props,"USerData")
  useEffect(() => {
    getUserData();
  }, []);

  const Poster = () => {
    return (
      <View style={styles.taskerMainView}>
        <View style={styles.taskerColoum}>
          <Text style={styles.taskerFirstRow}>Jobs</Text>
          <Text style={styles.taskerSecondRow}>120</Text>
        </View>
        <View style={styles.taskerColoum}>
          <Text style={styles.taskerFirstRow}>Rate</Text>
          <Text style={styles.taskerSecondRow}>$12Hr</Text>
        </View>
        <View style={styles.taskerColoum}>
          <Text style={styles.taskerFirstRow}>Badges</Text>
          <Text style={styles.taskerSecondRow} ><Icon style={styles.taskerIcon} name="shield" size={16} color="#4C6992" /></Text>
        </View>
      </View>
    )
  }

  const Tasker = () => {
    return (<>
      <View style={styles.rating}>
        <Text>
          <Icon name="star" size={22} color="gold" />
          <Icon name="star" size={22} color="gold" />
          <Icon name="star" size={22} color="gold" />
          <Icon name="star" size={22} color="gold" />
          <Icon name="star" size={22} color="gold" />
        </Text>
        <Text style={{ marginLeft: 10 }}>4.2 Rating & 2 reviews</Text>
      </View>
      <View style={styles.cardBottomView}>

        <View style={styles.cardBottomViewLeft}>
          <Avatar.Image
            // style={styles.avtarImage}
            size={40}
            source={require('../../../assets/profile.jpg')}
          // source={userData.profile_pic}
          />
        </View>

        <View style={styles.cardBottomViewRight}>
          <Text style={styles.cardBottomViewRightTitle}>
            {'Replace existing light fitting with the same'}
          </Text>
          <View style={styles.cardBottomViewRightSecond}>
            <Text style={styles.cardBottomViewRightSecondTitle}>
              {'Comment : '}
            </Text>
            <Text style={styles.cardBottomViewRightSecondSubtitle}>
              {'Greate work done!!!!!'}
            </Text>
          </View>
          <View style={styles.cardBottomViewRightThird}>
            <Text style={styles.cardBottomViewRightIcons}>
              <Icon name="star" size={22} color="gold" />
              <Icon name="star" size={22} color="gold" />
              <Icon name="star" size={22} color="gold" />
            </Text>
            <Text style={styles.cardBottomViewRightThirdDate}>
              {'3 days ago'}
            </Text>
          </View>
        </View>
      </View>
    </>

    )
  };

  const getUserData = () => {
    // debugger;
    Api.postApi(formData, 'getuserbyid')
      .then(response => {
        console.log(response, 'USerData');
        if (response.status === 200) {
          setUserData(response.data.data[0]);
          // console.log(response.data.data[0].user_name, "USerDataSet");
          console.log(userData, 'USerData');
        }
      })
      .catch(error => {
        // setLoader(false);
        console.log(error, 'error');

        if (error.response.data) {
        }
      });
  };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <ScrollView>
        <View style={styles.mainBody}>
          <Appbar.Header style={styles.profileHeader}>

            {/* <Appbar.Content title={"".concat(userData.user_name)} /> */}
          </Appbar.Header>

          <View style={styles.backgroundView}>
            <Avatar.Image
              style={styles.avtarImage}
              size={100}
              // source={require('../../../assets/profile.jpg')}
              source={userData.profile_pic}
            />
            <View style={styles.titleView}>
              <Text style={styles.title}>{userData.user_name}</Text>
              <Text style={styles.subtitle}>{userData.address}</Text>
              <Text style={styles.subtitle}>
                {"Member since ".concat(moment(userData.created_at).format("Do MMMM YYYY"))}
              </Text>
            </View>
            <View style={styles.tabView}>
              <View style={[styles.tab, styles.tabButton]}>
                <TouchableOpacity
                  onPress={() => {
                    setAccountType('Tasker');
                  }}
                // style={styles.appButtonContainer}
                >
                  <Text>{'As a Tasker'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tab}>
                <TouchableOpacity
                  onPress={() => {
                    setAccountType('Poster');
                  }}
                // style={styles.appButtonContainer}
                >
                  <Text>{'As a Poster'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {accountType == "Tasker" ? Tasker() : Poster()}

          </View>

          <View style={[styles.backgroundView, styles.aboutus]}>
            <View>
              <Text style={styles.aboutUsTitle}>{'About Us'}</Text>
            </View>
            <View>
              <Text style={styles.aboutUsSubTitle}>{userData.about}</Text>
            </View>
          </View>


          <View style={[styles.backgroundView, styles.aboutus]}>
            <View>
              <Text style={styles.aboutUsTitle}>{'Transportation'}</Text>
            </View>
            <View>
              <Text style={styles.aboutUsSubTitle}>{'1. Bicycle'}</Text>
              <Text style={styles.aboutUsSubTitle}>{'2. Car'}</Text>
              <Text style={styles.aboutUsSubTitle}>{'3. Scooter'}</Text>
            </View>
          </View>

          <View style={[styles.buttonView, { marginVertical: 20 }]}>
            <TouchableOpacity
              onPress={() => { }}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>{'HIRE ME FOR A TASK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </SafeAreaView> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    backgroundColor: '#E6E9F0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundView: {
    // height: 60,
    backgroundColor: '#ffffff',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  avtarImage: {
    position: 'relative',
    top: -40,
    display: 'flex',
    alignSelf: 'center',

    // left:10
  },
  profileHeader: {
    width: '100%',
    backgroundColor: 'transparent',
    shadowRadius: 0,
    marginBottom: 60,
  },
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  tabView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    alignSelf: 'center',
    //  width:'auto'
  },
  tab: {
    display: 'flex',
    // backgroundColor:'#ffffff',
    height: 40,
    justifyContent: 'center',
    margin: 4,
    padding: 10,
  },
  tabButton: {
    backgroundColor: '#ffffff',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems:'center',
    flexDirection: 'row',
  },
  cardBottomView: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor:'blue'
    marginTop: 20,
  },
  cardBottomViewLeft: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems:'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardBottomViewRight: {
    display: 'flex',
    // alignItems:'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cardBottomViewRightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardBottomViewRightSecond: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardBottomViewRightSecondTitle: {
    fontWeight: '700',
    fontSize: 14,
  },

  cardBottomViewRightThird: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardBottomViewRightThirdDate: {
    marginLeft: 10,
    color: 'grey',
  },

  aboutus: {
    marginTop: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  aboutUsTitle: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#4C6992',
  },
  aboutUsSubTitle: {
    paddingBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'SFUIText-bold',
  },
  appButtonContainer: {
    elevation: 2,
    width: '100%',
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
    fontWeight: '700',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonView: {
    width: '80%',
  },
  taskerMainView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40,
  },
  taskerColoum: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    // justifyContent:'center'

  },

  taskerFirstRow: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ABC1D2"

  },
  taskerSecondRow: {
    marginTop: 4,
    color: "#4C6992",
    fontFamily: "SFUIText-regular",

    display: "flex",
    justifyContent: "center",
    alignItems: "center"


  },
  taskerIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

});

export default Profile;

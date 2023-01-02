import { Item } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import Carousel from '../../components/Carousel/Carousel'
import { dummyData } from '../../utils/carousel/carouselData'

const { width, height } = Dimensions.get('window')


const GetStarted = props => {
  const { navigation } = props;
  const [isStarted, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // const delay = 3000;
  // const timeoutRef = useRef(null);

  // function resetTimeout() {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(
  //     () =>
  //       setActiveIndex(prevIndex =>
  //         prevIndex === listArray.length - 1 ? 0 : prevIndex + 1,
  //       ),
  //     delay,
  //   );

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [activeIndex]);
  // useEffect(() => {
  //   timeoutFun();
  // }, []);
  // const timeoutFun = () => {
  //   setTimeout(() => {
  //     if (activeIndex === 0) {
  //       setActiveIndex(1);
  //     } else if (activeIndex === 1) {
  //       setActiveIndex(2);
  //     } else {
  //       setActiveIndex(0);
  //     }
  //     // // // timeoutFun()
  //   }, 10000);
  // };

  // const listArray = [
  //   {
  //     name: 'Theffy',
  //     info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. the industrys standard dummy text ever since the 1500s',
  //   },
  //   {
  //     name: 'Reuse Theffy',
  //     info: 'Lorem Ipsum is simply dummy text of the printing and n the industrys standard dummy text ever since the 1500s',
  //   },
  //   {
  //     name: 'My Theffy',
  //     info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy ',
  //   },
  // ];
  return (
    <SafeAreaView style={styles.safearea}>

      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={{ alignItems: 'flex-end', marginRight: 10 }}
            onPress={() => {
              setStarted(true);
              navigation.navigate('Home');
            }}>
            <View style={styles.skip_view}>
              <Text style={styles.skip_btn}>Skip</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.container}> */}

        <View style={{ marginVertical: 10, }} >
          <Carousel data={dummyData} />
        </View>
        {/* <ScrollView horizontal decelerationRate="fast">
            <Image
              style={{width: '100%', height: 300, resizeMode: 'center'}}
              source={require('../../assets/splash-screen.png')}
            />
          </ScrollView> */}

        {/* </View> */}
        {/* <View
            style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 28}}>
              {listArray[activeIndex].name}
            </Text>
            <Text
              style={{
                color: '#9e9e9e',
                fontWeight: 'bold',
                marginVertical: 10,
                textAlign: 'center',
              }}>
              {listArray[activeIndex].info} {activeIndex}
            </Text>
          </View>

          <View style={{flex: 0.5, marginBottom: 30, flexDirection: 'row'}}>
            {listArray.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  borderBottomColor:
                    activeIndex === idx ? colors.mainColor : 'lightgray',
                  borderBottomWidth: 4,
                  marginHorizontal: 10,
                  flex: 1,
                  width: 50,
                  height: 40,
                }}
                onPress={() => {
                  setActiveIndex(idx);
                }}></TouchableOpacity>
            ))}
          </View> */}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor:"tomato",
            paddingHorizontal: 20
          }}>
          <TouchableOpacity
            style={styles.rowBtn}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.rowTextBtn}>{'Create Account'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowBtn}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.rowTextBtn}>{'Login'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* } */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#EBF3F9',
  },
  container: {
    // flex: 1,
    // alignItems:"center",
    width: width,
    height: height,
    justifyContent: "center",

    // paddingHorizontal: 30,
    paddingVertical: 50,
  },
  skip_view: {
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 40,
    width: 70,
    alignItems: 'center',
  },
  skip_btn: {
    fontWeight: '700',
    fontSize: 14,
    color: '#848484',
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  rowBtn: {
    // elevation: 2,
    height: 35,
    width: 150,
    marginHorizontal: 10,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  rowTextBtn: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});

export default GetStarted;

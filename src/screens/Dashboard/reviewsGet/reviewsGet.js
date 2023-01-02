import React, {useEffect, useState} from 'react';
import {View, Text, Item} from 'native-base';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import Api from '../../../utils/Api';
import Loader from '../../../components/Loader/Loader';
import WithoutLoginPage from '../../../components/withoutLogInPage/withoutLoginPage';

const reviewsGet = props => {
  const {navigation, userInfo} = props;

  const [showLoader, setLoader] = useState(false);
  const [TaskerReviewData, setTaskerReviewData] = useState([]);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    userInfo && taskerReviewDataApi();
  }, []);

  const taskerReviewDataApi = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('user_id', userInfo.id);

    Api.postApi(formData, 'Tasker_ReviewByUser')
      .then(response => {
        if (response.status === 200) {
          if (response.data.error === 'true') {
            setMsg(response.data.message);
            setErrorMsg(true);
          } else {
            setTaskerReviewData(response.data.data);
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
  const [isTasker, setIsTasker] = useState(true);

  return !userInfo ? (
    <WithoutLoginPage />
  ) : showLoader ? (
    <Loader />
  ) : (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsTasker(true);
          }}>
          <View style={[isTasker ? styles.activeButton : styles.buttonView]}>
            <Text style={{fontWeight: 'bold'}}>As Tasker</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsTasker(false);
          }}>
          <View style={[isTasker ? styles.buttonView : styles.activeButton]}>
            <Text style={{fontWeight: 'bold'}}>As Poster</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.reviewMainContainer]}>
        <View style={[styles.titleView]}>
          <Text style={[styles.titleText]}>Ratings and Reviews</Text>
        </View>
        <View style={[styles.subView]}>
          <Text style={[styles.titleText]}></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activeButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 20,

    backgroundColor: '#69C4FF',
  },
  buttonView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  reviewMainContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}
export default connect(mapStateToProps)(reviewsGet);

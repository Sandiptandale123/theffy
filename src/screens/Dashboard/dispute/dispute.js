import {View, Text, Item} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native';
import Loader from '../../../components/Loader/Loader';
import {connect} from 'react-redux';
import Api from '../../../utils/Api';
import {SafeAreaView} from 'react-native-safe-area-context';
import WithoutLoginPage from '../../../components/withoutLogInPage/withoutLoginPage';

const dispute = props => {
  const {navigation, userInfo} = props;
  const [disputeData, setDisputeData] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    if (userInfo) {
      getDisputeApi();
    }
  }, []);

  const getDisputeApi = () => {
    setLoader(true);
    debugger;
    const formData = new FormData();
    formData.append('id', userInfo.id);

    Api.postApi(formData, 'Dispute_list')
      .then(response => {
        if (response.status === 200) {
          if (response.data.error === 'true') {
            setMsg(response.data.message);
            setErrorMsg(true);
          } else {
            setDisputeData(response.data.data);
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

  return (
    <>
      {!userInfo ? (
        <WithoutLoginPage />
      ) : showLoader ? (
        <Loader />
      ) : errorMsg ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>{msg}</Text>
        </View>
      ) : (
        <SafeAreaView>
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[style.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            data={disputeData}
            renderItem={({item, index, separators}) => (
              <View style={{marginTop: 10}}>
                <TouchableHighlight
                  key={item.key}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}
                  style={{backgroundColor: 'white', padding: 20}}>
                  <View style={{backgroundColor: 'white'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Title: {item.title}
                    </Text>
                    <Text style={{fontSize: 14}}>
                      Postname: {item.postname}
                    </Text>
                    <Text style={{fontSize: 12}}>Type: {item.type}</Text>
                    <Text style={{fontSize: 12}}>
                      Description: {item.comment}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          />

          {/* <DataTable>
            <DataTable.Header>
              <DataTable.Title>Title</DataTable.Title>
              <DataTable.Title>Post Name</DataTable.Title>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Description</DataTable.Title>
            </DataTable.Header>

            {disputeData.map((item, index) => {
              <DataTable.Row>
                <DataTable.Cell>{item.title}</DataTable.Cell>
                <DataTable.Cell>{item.postname}</DataTable.Cell>
                <DataTable.Cell>{item.type}</DataTable.Cell>
                <DataTable.Cell>{item.comment}</DataTable.Cell>
              </DataTable.Row>;
            })}

            <DataTable.Pagination
              page={page}
              numberOfPages={3}
              onPageChange={page => setPage(page)}
              label="1-2 of 6"
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable> */}
        </SafeAreaView>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(dispute);

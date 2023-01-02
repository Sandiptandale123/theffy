import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderBack from '../../components/Headers/headerBack';
import HeaderLeft from '../../components/Headers/headerLeft';

import HeaderTitle from '../../components/Headers/headerTitle';
import MyAccountPage from '../../screens/Dashboard/myaccount/myAccount';
import colors from '../../utils/colors';





const AccountStack = createStackNavigator({

    MyAccount:
    {
        screen: MyAccountPage,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#E6E9F0'    
                      },
            tabBarVisible: true,
            headerLeft: ()=><HeaderLeft navigation={navigation} />,

            headerTitle: ()=><HeaderTitle navigation={navigation} title="Profile" />,

        }) ,
    },
   

},
    {
        initialRouteName: 'MyAccount',
       
    }

)
export default AccountStack;







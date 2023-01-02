import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderBack from '../../components/Headers/headerBack';
import HeaderLeft from '../../components/Headers/headerLeft';

import HeaderTitle from '../../components/Headers/headerTitle';
import HomePage from '../../screens/Dashboard/home/home';
import PostTask1 from '../../screens/Dashboard/task/PostTask1';
import PostTask2 from '../../screens/Dashboard/task/PostTask2';
import PostTask3 from '../../screens/Dashboard/task/PostTask3';
import PostTask4 from '../../screens/Dashboard/task/PostTask4';
import PremiumPost from '../../screens/Dashboard/task/PremiumPost';
import TaskDetails from '../../screens/Dashboard/task/TaskDetails';
import MyTaskScreen from '../../screens/Dashboard/task/MyTaskScreen';
import colors from '../../utils/colors';
import ReferPage from '../../screens/Dashboard/referEarn/referEarn';
import Wallet from '../../screens/Dashboard/wallet/wallet';
import TaskDetails1 from '../../screens/Dashboard/mytask/TaskDetails1';
import Payment from '../../screens/Dashboard/payment/payment';
import dispute from '../../screens/Dashboard/dispute/dispute';
import reviews from '../../screens/Dashboard/reviewsGet/reviewsGet';

// PostTask1 :{
//     screen:PostTask1,

// },
// PostTask2 :{
//     screen:PostTask2,

// },
// PostTask3 :{
//     screen:PostTask3,

// },
// PostTask4 :{
//     screen:PostTask4,

// }

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarVisible: true,
        headerLeft: () => <HeaderLeft navigation={navigation} />,

        headerTitle: () => (
          <HeaderTitle navigation={navigation} title=" Theffy " />
        ),
      }),
    },
    PostTask1: {
      screen: PostTask1,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Post Task',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    PostTask2: {
      screen: PostTask2,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Post Task',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    TaskDetails1: {
      screen: TaskDetails1,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Task Details',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    PostTask3: {
      screen: PostTask3,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Post Task',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    PostTask4: {
      screen: PostTask4,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Post Task',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    PremiumPost: {
      screen: PremiumPost,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Post Task',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    TaskDetails: {
      screen: TaskDetails,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Task Details',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    MyTaskScreen: {
      screen: MyTaskScreen,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'My Task Screen',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    ReferPage: {
      screen: ReferPage,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Refer & Earn',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    Wallet: {
      screen: Wallet,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Payout',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    Payment: {
      screen: Payment,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Payment',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    dispute: {
      screen: dispute,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Dispute',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
    reviews: {
      screen: reviews,

      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: colors.mainHeaderColor,
        },
        tabBarVisible: true,
        title: 'Reviews',
        headerTitleStyle: {
          color: '#000',
        },

        headerLeft: () => <HeaderBack navigation={navigation} />,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);
export default HomeStack;

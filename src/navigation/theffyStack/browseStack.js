import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderBack from '../../components/Headers/headerBack';
import HeaderLeft from '../../components/Headers/headerLeft';

import HeaderTitle from '../../components/Headers/headerTitle';
import BrowsePage from '../../screens/Dashboard/browse/browse';
import MakeOffer from '../../screens/Dashboard/makeoffer/makeOffer';
import TaskDetails1 from '../../screens/Dashboard/mytask/TaskDetails1';
import ReviewPage from '../../screens/Dashboard/review/reviewPage'
import colors from '../../utils/colors';

const BrowseStack = createStackNavigator({

    Browse:
    {
        screen: BrowsePage,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                // backgroundColor: colors.mainColor
            },
            tabBarVisible: true,
            headerLeft: () => <HeaderLeft navigation={navigation} />,

            headerTitle: () => <HeaderTitle navigation={navigation} title="Browse " />,

        }),
    },
    TaskDetails1:
    {
        screen: TaskDetails1,

        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.mainHeaderColor
            },
            tabBarVisible: true,
            title: 'Task Details',
            headerTitleStyle: {
                color: '#000'
            },

            headerLeft: () => <HeaderBack navigation={navigation} />,

        }),
    },
    MakeOffer:
    {
        screen: MakeOffer,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.mainHeaderColor
            },
            tabBarVisible: true,
            title: 'Make Offer',
            headerTitleStyle: {
                color: '#000'
            },

            headerLeft: () => <HeaderBack navigation={navigation} />,

        }),
    },
    ReviewPage:
    {
        screen: ReviewPage,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.mainHeaderColor
            },
            tabBarVisible: true,
            title: 'Award Your Tasker',
            headerTitleStyle: {
                color: '#000'
            },

            headerLeft: () => <HeaderBack navigation={navigation} />,

        }),
    },
},
    {
        initialRouteName: 'Browse',

    }

)
export default BrowseStack;







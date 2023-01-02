
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderBack from '../../components/Headers/headerBack';
import HeaderLeft from '../../components/Headers/headerLeft';

import HeaderTitle from '../../components/Headers/headerTitle';
import MyTask from '../../screens/Dashboard/mytask/task';
import TaskDetails1 from '../../screens/Dashboard/mytask/TaskDetails1';
import MakeOffer from '../../screens/Dashboard/makeoffer/makeOffer';
import colors from '../../utils/colors';



const MyTaskStack = createStackNavigator({

    MyTask:
    {
        screen: MyTask,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                // backgroundColor: colors.mainColor
            },
            tabBarVisible: true,
            headerLeft: () => <HeaderLeft navigation={navigation} />,

            headerTitle: () => <HeaderTitle navigation={navigation} title="My Task" />,

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

        }) ,
    },

},
    {
        initialRouteName: 'MyTask',

    }

)
export default MyTaskStack;







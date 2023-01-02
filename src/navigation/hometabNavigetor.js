import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { View, Text, Image } from 'react-native';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './theffyStack/homeStack';
import BrowseStack from './theffyStack/browseStack';
import MyTaskStack from './theffyStack/myTaskStack';
import ChatStack from './theffyStack/chatStack';
import AccountStack from './theffyStack/accountStack';

const AppNavigation = createBottomTabNavigator({
    Home:
    {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            borderBottomWidth: 2,
            tabBarIcon: ({ tintColor, focused }) => (
                <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5, }}>
                    <Icon name="ios-home" size={25} color={tintColor} />
                </View>
            ),
        },

    },
    MyTaskTab:
    {
        screen: MyTaskStack,
        navigationOptions: {
            tabBarLabel: 'My Task',
            borderBottomWidth: 2,
            tabBarIcon: ({ tintColor, focused }) => (
                <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5, }}>
                    <Icon name="ios-albums" size={25} color={tintColor} />

                </View>
            ),
        },

    },
    Browse:
    {
        screen: BrowseStack,
        navigationOptions: {
            tabBarLabel: 'Browse',
            borderBottomWidth: 2,
            tabBarIcon: ({ tintColor, focused }) => (
                <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5, }}>
                    <Icon name="ios-search" size={25} color={tintColor} />

                </View>
            ),
        },

    },
    ChatTab:
    {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: 'Chat',
            borderBottomWidth: 2,
            tabBarIcon: ({ tintColor, focused }) => (
                <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5, }}>
                    <Icon name="ios-chatbubbles" size={25} color={tintColor} />

                </View>
            ),
        },

    },
    AccountTab:
    {
        screen: AccountStack,
        navigationOptions: {
            tabBarLabel: 'Account',
            borderBottomWidth: 2,
            tabBarIcon: ({ tintColor, focused }) => (
                <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5, }}>
                    <Icon name="ios-contact" size={25} color={tintColor} />

                </View>
            ),
        },

    },


},
    {
        tabBarOptions: {
            activeTintColor: colors.activeTintColor,
            activeBackgroundColor: colors.white,
            inactiveTintColor: colors.mainColor,
            swipeEnabled: true,
            adaptive: true,
            lazy: true,
            style: {
                borderWidth: 0,
                borderTopWidth: 0.5,
                alignSelf: 'center',
                height: 60,

                ...Platform.select({
                    android: {
                        backgroundColor: colors.white,
                    },
                })
            },
            indicatorStyle: {
                backgroundColor: 'red',
                // borderBottomWidth: 4,
                borderColor: 'red',
            },
            labelStyle: {
                fontSize: 12,
                // marginBottom: 5,
                alignSelf: 'center',


            },
        }

    },
    {
        initialRouteName: 'Browse',
        defaultNavigationOptions: ({ navigation }) => ({
            title: "Theffy"
        }),
    }


)
export default AppNavigation;

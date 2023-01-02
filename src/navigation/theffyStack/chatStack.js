import React, { useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderBack from '../../components/Headers/headerBack';
import HeaderLeft from '../../components/Headers/headerLeft';
import HeaderTitle from '../../components/Headers/headerTitle';
import HeaderChat from '../../components/Headers/headerChat';
import ChatPage from '../../screens/Dashboard/chat/chat';
import ChatScreen from '../../screens/Dashboard/chat/chatScreen';
import colors from '../../utils/colors';




const ChatStack = createStackNavigator({
    

    chatHome:
    {
        screen: ChatPage,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                // backgroundColor: colors.mainColor
            },
            tabBarVisible: true,
            headerLeft: () => <HeaderLeft navigation={navigation} />,

            headerTitle: () => <HeaderTitle navigation={navigation} title="Chat" />,

        }),
    },
    ChatScreen:
    {
        screen: ChatScreen,
        navigationOptions: ({ navigation }) => ({
            // headerStyle: {
            //     // backgroundColor: colors.mainColor
            //     height:100
            // },
            tabBarVisible: false,
           // headerLeft: () => <HeaderLeft navigation={navigation} />,
            
            // headerTitle: () => <HeaderChat navigation={navigation} title="Clean My House" />,
          
          
        }),
    },

},
    {
        initialRouteName: 'chatHome',

    }

)
export default ChatStack;







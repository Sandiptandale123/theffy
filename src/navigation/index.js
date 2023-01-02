import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './authNavigation';
// import AppStack from './AppStack';
import SplashScreen from '../screens/splashscreen/splashscreen';
import GetStarted from '../screens/GetStarted/getstarted';
import Drawer from '../navigation/drawer/drawer';


const SwitchNavigator = createSwitchNavigator(
  {


    SplashScreen:SplashScreen,
    Auth: AuthNavigation,
     Drawer: Drawer,
    //  HomePage:HomeStack,
     GetStarted: GetStarted,
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
import {createDrawerNavigator} from 'react-navigation-drawer';
import AppStack from '../AppStack';
import DrawerPage from './drawerpage';
const Drawer = createDrawerNavigator(
  {
    // Auth: AuthNavigation,
    AppNav: AppStack,
  },
  {
    initialRouteName: 'AppNav',
    contentComponent: DrawerPage,
    drawerWidth: 300,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: 'rgba(0,0,0,0.5)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  },
);
export default Drawer;

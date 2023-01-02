import { createDrawerNavigator } from 'react-navigation-drawer';
import testStart from '../../screens/test/exam/exam';
import Query from '../../screens/query/Query';
// import AppNavigation from '../appNavigation';
import AppStack from '../AppStack';
import CustomDrawer from '../../component/CustomDrawer';
import examDriverPage from './examdrawer';

import NestedTabs from '../../navigation/nestedTab'
import examPanel from '../../component/exampanel';

const RightDrower = createDrawerNavigator(
    {
        App: AppStack,
        Query: Query,
        testStart: testStart,
        NestedTabs: NestedTabs,

    },
    {
        getCustomActionCreators: (route, stateKey) => { return { toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }) }; },
        initialRouteName: 'App',
        contentComponent: examPanel,
        drawerWidth: 300,
        drawerPosition: 'right'
    }
);



export default RightDrower;
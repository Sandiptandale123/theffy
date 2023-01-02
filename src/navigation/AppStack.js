import { createNavigator } from 'react-navigation';

import PostPostLoginAppContainer from './PostLoginAppContainer';
// import BarNavigation from './barNavigation';
import AppNavigation from './hometabNavigetor';

const AppStack = createNavigator(PostPostLoginAppContainer, AppNavigation.router, {});

export default AppStack;
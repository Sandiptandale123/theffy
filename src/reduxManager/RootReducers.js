import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import UserReducer from './User/UserReducer';
import UserAuthenticationReducer from './UserAuthentication/UserAuthenticationReducer';
import TaskReducer from './Task/TaskReducer';


const reducers = combineReducers({
    userData: UserReducer,
    authDetails: UserAuthenticationReducer,
    taskInfo:TaskReducer
});

const persistConfig = {
    key: 'root',
    // storage: AsyncStorage,
    storage: FilesystemStorage
    // storage,
    // whitelist: ['searchHistories', 'appConfiguration']
}

const appReducer = persistReducer(persistConfig, reducers)

export default appReducer
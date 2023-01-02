import 'react-native-gesture-handler';

import React from 'react';
import { Root } from "native-base";
import AppContainer from './navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { configStore } from './reduxManager';



export default function App() {
    const { store, persistor } = configStore();

    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Root>
                <AppContainer />
            </Root>
        </PersistGate>
    </Provider>
}

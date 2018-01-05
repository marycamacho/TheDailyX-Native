import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from '../reducers';
import { userReducer } from '../reducers/user_reducer'

import {createLogger} from "redux-logger";
const middleware = [thunk ];
//import createMigration from 'redux-persist-migrate'
let reducerKey = 'appSettingsReducer';  // store key holding the version number
//const migration = createMigration(config.versionManifest, reducerKey)
if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
 }

// persistReducer({
//     key: 'primary',
//     storage: AsyncStorage,
// },  userReducer  );
function configureStore () {
    let store = createStore(
        reducers,
        {},
        compose(
            // applyMiddleware(thunk),
            applyMiddleware(...middleware),
            // migration
            //  autoRehydrate()
        )
    );
    let persistor = persistStore(store);

    return { persistor, store }
}

 export default configureStore;

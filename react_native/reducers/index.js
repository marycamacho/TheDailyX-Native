import {persistCombineReducers,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user_reducer';
const userReducerConfig = {
    key: 'userReducer',
    storage: storage,
 }
const config = {
    key: 'primary',
    storage
}
 export default persistCombineReducers(config, {
     userReducer: persistReducer(userReducerConfig, userReducer),
});

import {persistCombineReducers,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import goalsReducer from './goals_reducer';
import userReducer from './user_reducer';
import appReducer from "./app_reducer";

const userReducerConfig = {
    key: 'userReducer',
    storage: storage,
 }
const config = {
    key: 'primary',
    storage,
    whitelist: ['userReducer']
}
 export default persistCombineReducers(config, {
    // userReducer: persistReducer(userReducerConfig, userReducer),
     userReducer,
     appReducer,
     goalsReducer,
});

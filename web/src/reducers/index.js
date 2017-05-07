/**
 * Created by marycamacho on 5/2/17.
 */

import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_current_user';


const rootReducer = combineReducers({
    currentUser: CurrentUserReducer
});

export default rootReducer;

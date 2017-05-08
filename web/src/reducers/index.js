/**
 * Created by marycamacho on 5/2/17.
 */

import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_current_user';
import MetricsReducer from './reducer_metrics';



const rootReducer = combineReducers({
    currentUser: CurrentUserReducer,
    metrics: MetricsReducer
});

export default rootReducer;

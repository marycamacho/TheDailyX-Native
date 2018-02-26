import {
    UPDATE_USER_DATA,
    USER_LOGOUT
} from "../constants/ActionTypes";
import _ from "lodash";

import {REHYDRATE} from 'redux-persist';
const initialState = {
    token: '',
    user: {},
    customUserData: {},
}
export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case REHYDRATE: /* this is required to populate reducer state from data saved in persisted store */
           console.log('action payload REHYDRATE', action );
            if (!_.isUndefined(action.payload) && !_.isUndefined(action.payload.userReducer)) {
                return action.payload.userReducer
            } else {
                return state;
            }
        case UPDATE_USER_DATA:
            console.log('in update user data', action);
            return {
                ...state,
                user: action.payload.User ? action.payload.User : state.user,
                token: action.payload.token ? action.payload.token : state.token,
                customUserData: action.payload.customUserData ? action.payload.customUserData : state.customUserData,
            };
        case USER_LOGOUT:
            return initialState;

        default:
            return state;
    }
}
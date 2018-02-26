import {
    USER_LOGOUT,UPDATE_APP_DATA
} from "../constants/ActionTypes";
import config from  '../config';
const initialState = {
     currentDevice:config.deviceMap[0],
 }

 export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGOUT:
            return {
                ...state,
                currentDevice:state.currentDevice
            }

        case UPDATE_APP_DATA:
            console.log(UPDATE_APP_DATA, state, action);
            return {
                ...state,
                currentDevice: action.payload.currentDevice ? action.payload.currentDevice : state.currentDevice,
              };
        default: return state
    }
}
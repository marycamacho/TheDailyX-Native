import {
    FETCH_GOAL_DATA,ADD_GOAL, UPDATE_GOAL,
    USER_LOGOUT
} from "../constants/ActionTypes";
import _ from "lodash";


const initialState = {
    data: [],
    fetched:false,
 }
export default function goalsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GOAL_DATA:
            console.log(FETCH_GOAL_DATA, action);
            return {
                fetched:true,
                data: action.payload.data,
            }
        case ADD_GOAL :
            console.log('in ADD_GOAL',action.payload, state );
            return {
                ...state,
                data: _.concat(state.data, [action.payload]),
             }

        case UPDATE_GOAL:
            console.log('UPDATE_GOAL',action.payload, state );
            var itemIndex = _.findIndex(state.data, {'_id': action.payload._id});
            if (itemIndex !== -1) {
                var updatedRecords = [...state.data.slice(0, itemIndex),
                    action.payload,
                    ...state.data.slice(itemIndex + 1)];
                return {
                    ...state,
                    data: updatedRecords
                }
            } else{
                return state
            }
        case USER_LOGOUT:
            return initialState;

        default:
            return state;
    }
}
/**
 * Created by marycamacho on 5/2/17.
 */

import { GET_DEFAULT_DATA } from '../actions';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DEFAULT_DATA:
            return action.payload;

        default:
            return state;
    }
}



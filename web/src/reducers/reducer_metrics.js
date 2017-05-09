/**
 * Created by marycamacho on 5/2/17.
 */

import { GET_DATA } from '../actions';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DATA:
            return action.payload.metrics;

        default:
            return state;
    }
}



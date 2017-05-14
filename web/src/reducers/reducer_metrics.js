/**
 * Created by marycamacho on 5/2/17.
 */

import { GET_DATA, INCREMENT_METRIC_SCORE  } from '../actions';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DATA:
            return action.payload.metrics;

        case INCREMENT_METRIC_SCORE:
            //console.log(action.payload);
            var newMetric = {...action.payload, score: action.payload.score + 1};
            var newState = [...state.filter(m => m.name !== newMetric.name), newMetric];
            console.log(newState);
            return newState;

        default:
            return state;
    }
}



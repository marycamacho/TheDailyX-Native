/**
 * Created by marycamacho on 5/2/17.
 */

import { GET_DATA, INCREMENT_METRIC_SCORE, DECREMENT_METRIC_SCORE, RESET } from '../actions';

const INITIAL_STATE = [];

function incrementDecrementMetric(state, action, increment) {
    var incrementAmount = increment ? 1 : -1;
    //Create a copy of the metric to increment
    var newMetric = {...action.payload, score: action.payload.score + incrementAmount};
    //Return a copy of the original State with the metric replaced with our new version
    return [...state.filter(m => m.name !== newMetric.name), newMetric];
}

export default function (state = INITIAL_STATE, action) {
    //console.log(action);
    switch (action.type) {
        case GET_DATA:
        case RESET:
            return action.payload.metrics;

        case INCREMENT_METRIC_SCORE:
            return incrementDecrementMetric(state, action, true);

        case DECREMENT_METRIC_SCORE:
            return incrementDecrementMetric(state, action, false);

        default:
            return state;
    }
}



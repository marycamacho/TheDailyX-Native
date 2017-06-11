/**
 * Created by marycamacho on 5/2/17.
 */
import { getTodaysData, saveData, resetData } from '../data';
import axios from 'axios';
import { GET_DATA, DECREMENT_METRIC_SCORE, INCREMENT_METRIC_SCORE, RESET, FETCH_CURRENT_USER } from './action_constants';

export function getDefaultData() {
    return {
        type: GET_DATA,
        payload: getTodaysData()
    };
}

export function incrementMetricScore(metric) {
    return (dispatch, getState) => {
        dispatch({
            type: INCREMENT_METRIC_SCORE,
            payload: metric
        });

        saveData(getState());
    };
}

export function decrementMetricScore(metric) {
    return (dispatch, getState) => {
        dispatch({
            type: DECREMENT_METRIC_SCORE,
            payload: metric
        });

        saveData(getState());
    };
}

export function reset() {
    return {
        type: RESET,
        payload: resetData()
    };
}


export function fetchUser () {

    const request = axios.get('/fetch_current_user').then(function (user) {
        return {
            user
        };
    });

    return {
        type: FETCH_CURRENT_USER,
        payload: request
    };
}

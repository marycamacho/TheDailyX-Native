/**
 * Created by marycamacho on 5/2/17.
 */
import { defaultData } from '../data';

export const GET_DEFAULT_DATA = 'GET_DEFAULT_DATA';
export const FETCH_CURRENT_USER = 'FETCH_USER';

    export function getDefaultData() {
        return {
            type: GET_DEFAULT_DATA,
            payload: defaultData()
        };
    }

    export function fetchUser () {

        const request = $.getJSON('/fetch_current_user').then(function (user) {
            return {
                user
            };
        });

        return {
            type: FETCH_CURRENT_USER,
            payload: request
        };
    }

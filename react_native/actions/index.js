export * from './auth_actions';
 import {AlertIOS} from 'react-native';
import React, {Component} from "react";
import axios from 'axios';
import {Toast}  from 'native-base';
import config from  '../config';
import {USER_LOGOUT} from "../constants/ActionTypes";
import moment from 'moment'

axios.defaults.baseURL = config.getEnvironment().serverBaseURL;
console.log('environment', config.getEnvironment().serverBaseURL);
console.log('config.getEnvironment().serverBaseURL', config.getEnvironment());


export function dispatchAction(payload, actionName) {
    return (dispatch, getState) => {
        dispatch({
            type: actionName,
            payload: payload
        })
    }
}


export function makeRequest(data, methodData) {
    return (dispatch, getState) => {
        var requestPromise;
        let token = getState().userReducer.token;
        let customUserData = getState().userReducer.customUserData;
        console.log('before request', data, methodData);
        var customHeaderData = {};
        if (!_.isUndefined(customUserData) && !_.isUndefined(customUserData.userCancelledAppMinorUpdate)) {
            customHeaderData['latest-cancelled-minor-update'] = customUserData.userCancelledAppMinorUpdate
        }
        if (_.isUndefined(methodData.type)) {
            var params = {
                params: data,
                baseURL: config.getEnvironment().serverBaseURL,
                headers: _.extend({}, customHeaderData, {'x-access-token': token}),
                timeout: 9000,
            };
            if (!_.isUndefined(methodData.timeout)) { /* add timeout to return error if internet is turned off when adding images to products */
                params.timeout = methodData.timeout
            }
            requestPromise = axios.get(methodData['endpoint'], params);
        } else if (methodData.type == 'post') {
            var params = {
                baseURL: config.getEnvironment().serverBaseURL,
                headers: _.extend({}, customHeaderData, {'x-access-token': token}),
                timeout: 9000,
            };
            if (!_.isUndefined(methodData.timeout)) { /* add timeout to return error if internet is turned off when adding images to products */
                params.timeout = methodData.timeout
            }
            requestPromise = axios.post(methodData['endpoint'], data, params)
        } else if (methodData.type == 'patch') {
            requestPromise = axios.patch(methodData['endpoint'], data, {
                baseURL: config.getEnvironment().serverBaseURL,
                headers: _.extend({}, customHeaderData, {'x-access-token': token}),
                timeout: 9000,
            })
        } else if (methodData.type == 'delete') {
            requestPromise = axios.delete(methodData['endpoint'], {
                baseURL: config.getEnvironment().serverBaseURL,
                headers: _.extend({}, customHeaderData, {'x-access-token': token}),
                timeout: 9000,
            })
        } else {
            console.log('methodData not defined');
        }
        return requestPromise.then(response => {
            console.log('response then', response);
            // if (typeof response.data == 'string' && response.data.includes('<!DOCTYPE html>')) {
            //     throw  {'clientMessage': 'errorSomethingWrong'};
            // }
            if (_.isUndefined(methodData['not_display_success_message'])) {
                displayMessage(methodData);
            }

            if (!_.isUndefined(methodData['success_event'])) {
                var payload = {
                    ...response.data
                };
                if (!_.isUndefined(methodData['success_event_data'])) {
                    _.assign(payload, methodData['success_event_data']);
                }

                dispatch({
                    type: methodData['success_event'],
                    payload: payload
                })
            }
            return response;
        })
            .catch(error => {
                console.log('response catch', error);
                return handleError({error, methodData, dispatch, getState})
            })
    }
}


export function handleError(params) {
    console.log('in handle error', params);
    return new Promise((resolve, reject) => {
        if (_.isUndefined(params.error.response)) {
            console.log('in network response', params.error);
            if (params.error.message == 'Network Error') {
                displayMessage({messageType: 'warning', messageCode: 'connectionError'});
                params.dispatch({
                    type: 'UPDATE_APP_DATA',
                    payload: {connectionErrorMessageLastDisplayedAt: moment().toISOString()}
                })
            } else if (_.includes(params.error.message, 'timeout') && _.includes(params.error.message, 'exceeded')) {

                var errorMessageLastDisplayedAt = params.getState().appReducer.connectionErrorMessageLastDisplayedAt;
                if (errorMessageLastDisplayedAt) {
                    console.log('getState().AppDataReducer', moment().diff(moment(errorMessageLastDisplayedAt), 'seconds'));
                }
                if (!errorMessageLastDisplayedAt || moment().diff(moment(errorMessageLastDisplayedAt), 'seconds') > 9) {
                    console.log('exceeded ', errorMessageLastDisplayedAt);
                    params.dispatch({
                        type: 'UPDATE_APP_DATA',
                        payload: {connectionErrorMessageLastDisplayedAt: moment().toISOString()}
                    })
                    displayMessage({messageType: 'warning', messageCode: 'timeoutRequestExceeded'});
                }

            } else { /* this is javascript error on client side */
                console.warn('error message', params.error.message);
            }
            reject(params.error);
        } else if (config.apiErrorCodeMap[getErrorCode(params.error)] == 'AccessTokenNotValid') {
            console.log('log out and redirect to log in');
            params.dispatch({
                type: USER_LOGOUT
            })
            reject(params.error);
        }
        else {
            if (_.isUndefined(params.methodData['not_display_error_message'])) {
                displayMessage({
                    ...params.methodData,
                    messageType: 'warning',
                    messageCode: getErrorMessage(params.error, params.defaultMessage)
                });
            }
            reject(params.error);
        }
    });
}

export function displayMessage(params) {
    console.log('params', params);

    var message = '';
    if (!_.isUndefined(config.clientMessages[params.messageCode])) {
        message = config.clientMessages[params.messageCode]
        if (!_.isUndefined(params['messageData'])) {
            var re = new RegExp(Object.keys(params['messageData']).join("|"), "gi");
            message = message.replace(re, function (matched) {
                return params['messageData'][matched];
            });
        }
    } else if (!_.isUndefined(params.messageCode)) {
        /* from server or other messages */
        message = params.messageCode;
    }
    if (message) {
        AlertIOS.alert(message);
    }
}


export function getErrorMessage(err, defaultMessage = false) {
    if (err.response && err.response.data && err.response.data.message) {
        return err.response.data.message;
    } else if (err.clientMessage) {
        return err.clientMessage;
    } else {
        return defaultMessage ? defaultMessage : 'errorSomethingWrong';
    }
};
export function getErrorCode(err) {
    if (err.response && err.response.data && err.response.data.errorCode) {
        return err.response.data.errorCode;
    } else {
        return '';
    }
};
export function getErrorMessageData(err) {
    if (err.response && err.response.data && err.response.data.errorMessageData) {
        return err.response.data.errorMessageData;
    } else {
        return false;
    }
};


export function userSignin(data, methodData = {}) {
    return (dispatch, getState) => {
        console.log('in user signin');
        return axios.post('signin', data).then(function (response) {
            console.log('signin response', response);
            this.dispatchAction(response.data, UPDATE_USER_DATA)
            return response;
        }).catch(function (error) {
            console.log('in signin error', error.response);
            return handleError({error, methodData, dispatch})
        })
    }
};


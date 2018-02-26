import Expo, {Notifications} from 'expo';
import React from 'react';
import {StyleSheet, Text,Dimensions} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import Orientation from 'react-native-orientation';
import configureStore from './store';
const { store, persistor } = configureStore()
import {   UPDATE_APP_DATA,} from './constants/ActionTypes'
import config from  './config';
 // persistor.purge(['userReducer']);
import {AuthScreen,GoalEntryScreen, GoalListScreen, GoalEditScreen} from './screens';


class App extends React.Component {
    componentDidMount() {
        const {width,height} = Dimensions.get('window')
        var currentDevice = _.find(config.deviceMap, {'width': width, 'height':height})
        store.dispatch({type:UPDATE_APP_DATA,
            payload:{  currentDevice: _.isUndefined(currentDevice) ? config.deviceMap[0] : currentDevice}});
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange() {
        const {width,height} = Dimensions.get('window')
        var currentDevice = _.find(config.deviceMap, {'width': width, 'height':height})
        store.dispatch({type:UPDATE_APP_DATA,
            payload:{  currentDevice: _.isUndefined(currentDevice) ? config.deviceMap[0] : currentDevice}});
    }

    render() {
        const MainNavigator = StackNavigator({
             auth: {screen: AuthScreen},
             goalList: {screen: GoalListScreen},
            goalEntry: {screen: GoalEntryScreen},
            goalEdit: {screen: GoalEditScreen},
        }, {

            headerMode: 'none',
            mode: 'modal',
            navigationOptions: {
                tabBarVisible: false,
            },
            lazyLoad: true
        });

        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                <MainNavigator />
                </PersistGate>
            </Provider>
        );
    }
}



Expo.registerRootComponent(App);

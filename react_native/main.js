import Expo, {Notifications} from 'expo';
import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './store';
const { store, persistor } = configureStore()
 // persistor.purge(['userReducer']);
import {AuthScreen,GoalEntryScreen, GoalAddEditScreen} from './screens';


class App extends React.Component {
    componentDidMount() {

    }

    render() {
        const MainNavigator = StackNavigator({
             auth: {screen: AuthScreen},
            goalEntry: {screen: GoalEntryScreen},
            goalAddEdit: {screen: GoalAddEditScreen},
            // main: {
            // screen: TabNavigator({
            //     goalEntry: {screen: GoalEntryScreen},
            //     goalAddEdit: {screen: GoalAddEditScreen},
            // }, {
            //     //  tabBarPosition: 'bottom',
            //     tabBarOptions: {
            //         labelStyle: {fontSize: 12}
            //     }
            // })
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

Expo.registerRootComponent(App);

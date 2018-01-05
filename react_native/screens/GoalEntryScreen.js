import React, {Component} from "react";
import {View, Linking, Text, StyleSheet, StatusBar, TouchableOpacity, Image} from "react-native";
import {
    Container,
    Content,
    H3,
    Header,
    Left,
    Right,
    InputGroup,
    Button as NBButton,
    Icon as NBIcon,
    Input,
    StyleProvider
} from "native-base";
import {Facebook} from 'expo';
import {FontAwesome, EvilIcons} from '@expo/vector-icons';
import {UPDATE_USER_DATA} from "../constants/ActionTypes";
import {makeRequest} from "../actions/";
import {Colors, GlobStyle} from "../Themes";
import {bindActionCreators} from "redux";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {connect} from "react-redux";

//import {displayMessage,getErrorCode} from  './../../actions';
import {validateEmail} from '../util/Utils'
//import config from "./../../config";


class GoalEntryScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false,
        }
        console.log('this props', this.props);

        this.goToNextScreen = _.throttle(this.goToNextScreen, 1000, {
            'leading': true,
            'trailing': false
        });
    }


    goToNextScreen() {
        console.log('in go to next screen');
        var self = this;

        self.setState({pending: true});


    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: Colors.white, flexGrow: 1, flex: 1}}>
                    <StatusBar  />
                    <Content scrollEnabled={false} enableResetScrollToCoords={false}
                             style={StyleSheet.flatten(GlobStyle.content)}>

                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                            }}>
                            <View
                                style={StyleSheet.flatten([{
                                    marginTop: 90,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    backgroundColor: Colors.orange,
                                }])}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    color: Colors.white
                                }}>Water</Text>
                            </View>

                            <View
                                style={StyleSheet.flatten([{
                                    marginTop: 90,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    backgroundColor: Colors.lightGreen,

                                }])}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    color: Colors.white
                                }}>Calories consumed</Text>
                            </View>

                            <View
                                style={StyleSheet.flatten([{
                                    marginTop: 90,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    backgroundColor: Colors.green,
                                }])}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    color: Colors.white
                                }}>Calories burned</Text>
                            </View>

                            <View
                                style={StyleSheet.flatten([{
                                    marginTop: 90,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    backgroundColor: Colors.orange,
                                }])}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    color: Colors.white
                                }}>Alcohol</Text>
                            </View>
                        </View>

                    </Content>
                </Container>
            </StyleProvider>

        )
    }
}
function mapStateToProps(state) {
    return {
        User: state.userReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        makeRequest,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GoalEntryScreen);
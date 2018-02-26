//Login / Register
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
import config from "./../config";
import {Colors, GlobStyle} from "../Themes";
import {bindActionCreators} from "redux";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {connect} from "react-redux";

//import {displayMessage,getErrorCode} from  './../../actions';
import {validateEmail} from '../util/Utils'
//import config from "./../../config";


class AuthScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false,
        }
        console.log('this props', this.props);
        this.loginWithFacebook = _.throttle(this.loginWithFacebook, 1000, {
            'leading': true,
            'trailing': false
        });
        this.loginWithGoogle = _.throttle(this.loginWithGoogle, 1000, {
            'leading': true,
            'trailing': false
        });
    }
    componentWillMount(){
        console.log('this props auth', this.props );
        if (this.props.User.token) {
            this.props.navigation.navigate('goalEntry');
        }
    }
    loginWithGoogle() {
        var self = this;

        self.setState({pending: true});

        Expo.Google.logInAsync({
            androidClientId: '',
            iosClientId: config.Google.IOSClientID,
            scopes: ['profile', 'email'],
        }).then(function (response) {
            console.log('response', response );
            if (response.type === 'success') {
                self.signIn({
                    type: 'Google',
                    accessToken: response.accessToken
                });
            } else {
                console.log('cancelled' );
            }

        }).catch(function (error) {
            console.log('in catch Login error', error, error.stack)
            self.setState({
                pending: false
            });
        })
    }

    loginWithFacebook() {
         var self = this;

        self.setState({pending: true});

        Facebook.logInWithReadPermissionsAsync(config.Facebook.ClientID, {
            permissions: ['public_profile', 'email'], // behavior:'browser' / * should be used in standalone app */
        }).then(function (response) {
            console.log('Login success', response)

            if (response.type !== 'success'){
                self.setState({pending: false});
                return;
            }
            self.signIn({
                type: 'Facebook',
                accessToken: response.token
            });
        }).catch(function (error) {
            console.log('in catch Login error', error, error.stack)
            self.setState({
                pending: false
            });
        })
    }

    signIn(params) {
        var self = this;
        var methodData = {
            "success_event": UPDATE_USER_DATA,
            "endpoint": "/authenticate",
            'type': 'post',
        };
        self.props.makeRequest(params, methodData).then(function (response) {
            console.log('response.data.User._id', response.data.User._id);
            setTimeout(function () {
                self.props.navigation.navigate('goalList');
            },1000)


        }).catch(function (error) {
            console.log('error', error);
            self.setState({
                pending: false
            });
        });
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: Colors.white, flexGrow: 1, flex: 1}}>
                    <StatusBar  />
                    <Content contentContainerStyle={{flexGrow: 1}} scrollEnabled={false}
                             enableResetScrollToCoords={false} style={StyleSheet.flatten(GlobStyle.content)}>

                        <View
                            style={{
                                flexGrow: 1,
                                flexDirection: 'column',
                            }}>
                            <View
                                style={StyleSheet.flatten([{
                                    flex: 20,
                                    marginTop: 90,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                }])}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    color: Colors.cyen
                                }}>The simplest and most easy to use goal-setting app available</Text>
                            </View>

                            <View style={{
                                flex: 35,
                                width: '100%',
                                backgroundColor: Colors.cyen,
                            }}>
                                <View
                                    style={StyleSheet.flatten([GlobStyle.center, {
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }])}>
                                    <Text style={{
                                        paddingHorizontal: 30,
                                        marginBottom: 20,
                                        fontSize: 17,
                                        textAlign: 'center',
                                        color: Colors.white
                                    }}>Get started by logging in with Google or Facebook</Text>
                                </View>

                                <View style={{
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    backgroundColor: Colors.cyen,
                                    marginTop: 10
                                }}>
                                    <TouchableOpacity
                                        disabled={this.state.pending}
                                        style={StyleSheet.flatten([GlobStyle.center, {
                                            width: 100,
                                            height: 100,
                                            backgroundColor: Colors.white,
                                            borderRadius: 10
                                        }, this.state.pending ? {backgroundColor: Colors.grayedOut} : {}])}
                                        onPress={() => this.loginWithGoogle()}><EvilIcons
                                        style={{color: Colors.cyen, marginRight: 15, fontSize: 90}}
                                        name="sc-google-plus"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={this.state.pending}
                                        style={StyleSheet.flatten([{
                                            width: 100,
                                            height: 100,
                                            backgroundColor: Colors.white,
                                            borderRadius: 10,
                                            alignItems: 'flex-end',
                                            overflow: 'hidden',
                                            justifyContent: 'flex-end'
                                        }, this.state.pending ? {backgroundColor: Colors.grayedOut} : {}])}
                                        onPress={() => this.loginWithFacebook()}><FontAwesome style={{
                                        color: Colors.cyen,
                                        marginRight: 15,
                                        position: 'relative',
                                        top: 7,
                                        fontSize: 90
                                    }} name="facebook-f"/></TouchableOpacity>
                                </View>
                            </View>

                            <View style={{
                                flex: 25,
                                backgroundColor: Colors.lightGreen,
                                justifyContent: 'center',
                                alignSelf: 'stretch'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    color: Colors.white
                                }}>Get our ad-free version</Text>
                            </View>

                            <View style={  {
                                flexDirection: 'row',
                                flex: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.orange
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    textAlign: 'right',
                                    color: Colors.white
                                }}>The Daily X is brought to you by </Text>
                                <TouchableOpacity
                                    onPress={ url => Linking.openURL(url) }
                                    style={ {} }
                                >
                                    <Text style={{
                                        fontSize: 13,
                                        textAlign: 'left',
                                        color: Colors.linkColor,
                                        textDecorationLine: 'underline',
                                    }}> JoyaSolutions</Text>
                                </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
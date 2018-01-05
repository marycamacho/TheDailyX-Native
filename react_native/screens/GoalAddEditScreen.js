import React, {Component} from "react";
import {View,  Text, StyleSheet, StatusBar, TouchableOpacity, Image} from "react-native";
 import {
    Container,
    Content,
    H3,
    Header,
    Left,
    Body,
    Right,
    InputGroup,
    Button as NBButton,
    Icon as NBIcon,
    Input,
    StyleProvider
} from "native-base";
 import {FontAwesome, EvilIcons} from '@expo/vector-icons';
 import {makeRequest, userLogout} from "../actions/";
import {Colors, GlobStyle,Images} from "../Themes";
import {bindActionCreators} from "redux";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {connect} from "react-redux";

//import {displayMessage,getErrorCode} from  './../../actions';
import {validateEmail} from '../util/Utils'
//import config from "./../../config";


class GoalAddEditScreen  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false,
            menuVisibility:false,
        }
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
    goToNextScreen(nextScreen) {
        this.props.navigation.navigate(nextScreen);
    }
logoutUser(){
    this.props.userLogout()
    setTimeout(()=>{
        this.props.navigation.navigate('auth');
    },1000)
}
    render() {
        console.log('this state1', this.state );
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: Colors.white, flexGrow: 1, flex: 1}}>
                    <StatusBar  />
                    <Header style={StyleSheet.flatten([{ justifyContent: 'space-between', marginTop:0, paddingBottom:10,borderBottomWidth:1, borderBottomColor:Colors.gray }])}  >
                        <Left   style={{ flex:1}}>

                        </Left>
                        <Body style={{alignItems:'center'}}>
                        <Image
                            source={Images.logo}
                            resizeMode={Image.resizeMode.contain}
                            style={StyleSheet.flatten([GlobStyle.headerLogo])}/>
                        </Body>
                        <Right style=  {{flex:1 }}>
                            <NBButton style={{width: 47, position:'relative', top:-3, marginRight: 0, paddingRight: 0}} transparent
                                      onPress={() => this.setState({
                                          'menuVisibility': !this.state.menuVisibility,
                                       }) }>
                                <FontAwesome style={{'color': Colors.green, fontSize: 35}} name='reorder'/>
                            </NBButton>
                        </Right>
                    </Header>
                    <Content scrollEnabled={false} contentContainerStyle={{flexGrow: 1}} enableResetScrollToCoords={false}
                             style={StyleSheet.flatten(GlobStyle.content)}>
                        {this.state.menuVisibility &&
                        <View style={StyleSheet.flatten([{
                            flex: 1,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            opacity: 1,
                            backgroundColor: '#fff',
                            borderTopWidth:0,
                            borderWidth: 0.5,
                            borderColor: Colors.lightGray,
                            width: 200,
                            zIndex: 2,
                        }])}>
                            <View style={{alignItems: 'stretch', flexDirection: 'column'}}>
                                <View style={StyleSheet.flatten([{
                                    justifyContent: 'flex-start',
                                     paddingVertical: 15,
                                    backgroundColor:Colors.lightGreen,
                                    borderWidth:0,
                                    flex: 1,
                                    flexDirection: 'column',
                                }])}>
                                    <TouchableOpacity
                                        onPress={() =>this.goToNextScreen('goalAddEdit')}>
                                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                                            <Text style={{
                                                 color:Colors.white,
                                                marginRight: 10,
                                                fontSize: 16
                                            }}
                                                  allowFontScaling={false}>
                                               Enter Daily Xs</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={StyleSheet.flatten([{
                                    justifyContent: 'flex-start',
                                    flex: 1,
                                    flexDirection: 'column',
                                    backgroundColor:Colors.orange,
                                     paddingVertical: 15,
                                    borderWidth: 0,
                                }])}>
                                    <TouchableOpacity
                                        onPress={() =>this.logoutUser()}>
                                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                                            <Text style={{
                                                color:Colors.white,
                                                marginRight: 10,
                                                fontSize: 16
                                            }}
                                                  allowFontScaling={false}>
                                                Log out</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        }

                        <View
                            style={{
                                flexDirection: 'column',
                                flexGrow: 1,
                             }}>
                            <View
                                style={StyleSheet.flatten([{
                                     flex:30,
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
                                    flex:30,
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
                                    flex:30,
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
                                    flex:30,
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
        makeRequest,userLogout,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GoalAddEditScreen);
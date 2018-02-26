import React, {Component} from "react";
import {View, ListView, Text, StyleSheet, StatusBar, TouchableOpacity, Image} from "react-native";
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
import {FontAwesome, Entypo, EvilIcons} from '@expo/vector-icons';
import {makeRequest, userLogout} from "../actions/";
import {Colors, GlobStyle, Images} from "../Themes";
import {bindActionCreators} from "redux";
import {FETCH_GOAL_DATA} from "../constants/ActionTypes";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {connect} from "react-redux";
import config from  '../config';


class GoalListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false,
            menuVisibility: false,
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    return r1 !== r2
                }
            })
        }
        this.goToNextScreen = _.throttle(this.goToNextScreen, 1000, {
            'leading': true,
            'trailing': false
        });
    }

    componentWillMount() {
        if (!this.props.goalsReducer.fetched) {
            var methodData = {
                "success_event": FETCH_GOAL_DATA,
                'endpoint': '/goals',
                'not_display_success_message': true,
            };
            this.props.makeRequest({UserID:this.props.User.user._id}, methodData).catch((err) => {})
        }  else {
            this.updateListData(this.props.goalsReducer.data)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.goalsReducer.fetched !== nextProps.goalsReducer.fetched) {
            this.updateListData(nextProps.goalsReducer.data)
        }
    }

    updateListData(items) {
        this.setState({
            items: items,
            ds: this.state.ds.cloneWithRows(items)
        })
    }

    goToNextScreen(nextScreen, params={}) {
        this.props.navigation.navigate(nextScreen, params);
    }


    logoutUser() {
        this.props.userLogout()
        setTimeout(() => {
            this.props.navigation.navigate('auth');
        }, 1000)
    }
    editGoal(row){
         this.props.navigation.navigate('goalEdit', {...row, recordID:row._id  });
    }
    _renderRow(item, sectionID, rowID) {
         if (_.isUndefined(item._id)) {
            return <View></View>
        }
        return (
            <View style={{
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor:Colors[config.colorsOrderList[parseInt(rowID) % 3]],
                paddingHorizontal: 10,
                  flexDirection: 'column'
            }}
                  key={ rowID}>

                <View style={{ flexDirection: 'row'}}>
                         <View style={{  flex:1, marginLeft:10,
                             justifyContent:'center', }}>
                            <H3 allowFontScaling={false} style={{
                                 lineHeight: 25,
                                fontSize: 20,
                                fontWeight: '700'
                            }}>{item.GoalName}</H3>
                        </View>
                    <View style={{flex: 1,alignSelf: 'flex-end'}}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end'}}>
                            <EvilIcons style={{'color': Colors.white, marginTop: 12, fontSize: 45}}
                                    onPress={ () => this.editGoal({...item,currentBgColor:parseInt(rowID) % 3})} name='pencil'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.log('this state goal list', _.size(this.props.goalsReducer.data) % 3,  this.state);
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: Colors.white, flexGrow: 1, flex: 1}}>
                    <StatusBar  />
                    <Header style={StyleSheet.flatten([{
                        justifyContent: 'space-between',
                        marginTop: 0,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.gray
                    }])}>
                        <Left   style={{ flex:1}}>
                            <Image
                                source={Images.logo}
                                resizeMode={Image.resizeMode.contain}
                                style={StyleSheet.flatten([GlobStyle.headerLogo])}/>
                        </Left>
                        <Body style={{alignItems:'center'}}>
                        </Body>
                        <Right style={{flex: 1}}>
                            <NBButton
                                style={{width: 47, position: 'relative', top: -3, marginRight: 0, paddingRight: 0}}
                                transparent
                                onPress={() =>  this.goToNextScreen('goalEdit', {currentBgColor:_.size(this.props.goalsReducer.data) % 3}) }>
                                <Entypo style={{'color': Colors.orange, fontSize: 35}} name='squared-plus'/>
                            </NBButton>
                            <NBButton
                                style={{width: 47, position: 'relative', top: -3, marginRight: 0, paddingRight: 0}}
                                transparent
                                onPress={() => this.setState({
                                    'menuVisibility': !this.state.menuVisibility,
                                }) }>
                                <FontAwesome style={{'color': Colors.cyen, fontSize: 35}} name='reorder'/>
                            </NBButton>
                        </Right>
                    </Header>
                    <Content scrollEnabled={true} contentContainerStyle={{flexGrow: 1}}
                             enableResetScrollToCoords={false}
                             style={StyleSheet.flatten(GlobStyle.content)}>
                        {this.state.menuVisibility &&
                        <View style={StyleSheet.flatten([{
                            flex: 1,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            opacity: 1,
                            backgroundColor: '#fff',
                            borderTopWidth: 0,
                            borderWidth: 0.5,
                            borderColor: Colors.lightGray,
                            width: 200,
                            zIndex: 2,
                        }])}>
                            <View style={{alignItems: 'stretch', flexDirection: 'column'}}>
                                <View style={StyleSheet.flatten([{
                                    justifyContent: 'flex-start',
                                    paddingVertical: 15,
                                    backgroundColor: Colors.lightGreen,
                                    borderWidth: 0,
                                    flex: 1,
                                    flexDirection: 'column',
                                }])}>
                                    <TouchableOpacity
                                        onPress={() => this.goToNextScreen('goalEntry')}>
                                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                                            <Text style={{
                                                color: Colors.white,
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
                                    backgroundColor: Colors.orange,
                                    paddingVertical: 15,
                                    borderWidth: 0,
                                }])}>
                                    <TouchableOpacity
                                        onPress={() => this.logoutUser()}>
                                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                                            <Text style={{
                                                color: Colors.white,
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

                        {this.props.goalsReducer.fetched ?
                            <View style={ {flex: 1}}>
                                {_.size(this.props.goalsReducer.data) > 0 ?
                                    (<View style={{flex: 1}}>
                                        <ListView
                                            enableEmptySections={ true }
                                            style={{flex: 1}}
                                            removeClippedSubviews={false}
                                            automaticallyAdjustContentInsets={ false }
                                            ref='listView'
                                            dataSource={ this.state.ds }
                                            renderRow={ (row, sectionID, rowID) => this._renderRow(row, sectionID, rowID) }/>
                                    </View>) :
                                    (<View style={{
                                        flex: 1,
                                        width: 300,
                                        alignSelf: 'center',
                                        flexDirection: 'column',
                                        marginTop: 30,
                                        marginHorizontal: 10
                                    }}>
                                        <Text allowFontScaling={false}
                                              style={{fontSize: 21, textAlign: 'center', lineHeight: 30}}>Create your
                                            goals by clicking on the big orange plus symbol</Text>
                                    </View>)
                                }
                            </View> : null
                        }

                    </Content>
                </Container>
            </StyleProvider>

        )
    }
}
function mapStateToProps(state) {
    return {
        User: state.userReducer,
        goalsReducer: state.goalsReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        makeRequest, userLogout,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GoalListScreen);
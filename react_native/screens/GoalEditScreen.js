import React, {Component} from "react";
import {View,  Text, StyleSheet, StatusBar,TouchableWithoutFeedback, TouchableOpacity, Image} from "react-native";
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
     Item,
    Input,
    StyleProvider
} from "native-base";
 import {FontAwesome, EvilIcons} from '@expo/vector-icons';
 import {makeRequest, userLogout} from "../actions/";
import {Colors, Fonts, GlobStyle,Images} from "../Themes";
import {bindActionCreators} from "redux";
import {RadioButtons} from "react-native-radio-buttons";
import {ADD_GOAL, UPDATE_GOAL} from "../constants/ActionTypes";
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {connect} from "react-redux";
import config from  '../config';



class GoalEditScreen  extends Component {
    constructor(props) {
        super(props)
        var currentRecord = {
           recordID:null,
            GoalName: '',
            GoalType: 'encourage',
            GoalNumber: 1,
            XRepresents: ''}
        if (_.get(this.props.navigation.state,['params', 'recordID'], false)){
            currentRecord = _.get(this.props.navigation.state, ['params']);
        }
        currentRecord.currentBgColor = _.get(this.props.navigation.state, ['params','currentBgColor'],0);
console.log('params',_.get(this.props.navigation.state, ['params']) );
             this.state = {
                pending: false,
                menuVisibility: false,
                 ...currentRecord,
                errors: {},
            }
         this.goToNextScreen = _.throttle(this.goToNextScreen, 1000, {
            'leading': true,
            'trailing': false
        });
    }
    onGoalTypeSelect(GoalType) {
        this.setState({
            GoalType: GoalType.value
        });
    }
    renderContainer(optionNodes) {
        return <View style={{  marginTop:10,  flexDirection: 'row',     alignSelf:'center',
            justifyContent: 'center'}}>{optionNodes}</View>;
    }
    renderOption(option, selected, onSelect, index) {
        if (option.value == this.state.GoalType) {
            selected = true;
        }
        const selectedCircle = selected ? {backgroundColor: Colors.white } : {backgroundColor:Colors[config.colorsOrderList[this.state.currentBgColor]] };
        return (
            <View style={{  flex:1,   justifyContent: 'center', flexDirection: 'row'}}   key={index}>
                <TouchableWithoutFeedback onPress={onSelect}>
                    <View style={StyleSheet.flatten([{
                        flexDirection: 'row',
                     }, {marginVertical: 5}])}>
                        <View style={[GlobStyle.radioBtnOuterCircle, { marginRight:3, marginTop:4,backgroundColor:Colors[config.colorsOrderList[this.state.currentBgColor]] }]}>
                            <View style={[GlobStyle.radioBtnInnerCircle,selectedCircle, {alignSelf:'center',  }]}>
                            </View>
                        </View>
                        <Text allowFontScaling={false}
                              style={StyleSheet.flatten([{paddingLeft: 3,color:Colors.white, fontSize: 19}])}>{option.label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    goToNextScreen(nextScreen, params={}) {
        this.props.navigation.navigate(nextScreen, params);
    }
    logoutUser(){
    this.props.userLogout()
    setTimeout(()=>{
        this.props.navigation.navigate('auth');
    },1000)
}
saveGoal() {
    var self = this;
    var methodData = {
        'endpoint': '/goals',
        //messageData: {'#1#': 'Goal'},
     };
    if (this.state.recordID) {
        methodData.type = 'patch'
        methodData.success_event    =  UPDATE_GOAL
   //     methodData.messageCode    =  'recordUpdated'
    } else {
        methodData.type = 'post'
        methodData.success_event    =  ADD_GOAL
     //   methodData.messageCode    =  'recordAdded'
    }


    var data ={
        id:this.state.recordID ? this.state.recordID : undefined,
        UserID:this.props.User.user._id,
        GoalName:this.state.GoalName,
        GoalType:this.state.GoalType,
        XRepresents:this.state.XRepresents,
        GoalNumber:this.state.GoalNumber,
    }
     this.props.makeRequest(data, methodData).then(function (response) {
            self.goToNextScreen('goalList')
     }).catch(e=>{});

 }

    render() {
        console.log('this state edit screen', this.props,this.state );

        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{backgroundColor: Colors.white, flexGrow: 1, flex: 1}}>
                    <StatusBar  />
                    <Header style={StyleSheet.flatten([{ justifyContent: 'space-between', marginTop:0, paddingBottom:10,borderBottomWidth:1, borderBottomColor:Colors.gray }])}  >
                        <Left   style={{ flex:1}}>
                            <Image
                                source={Images.logo}
                                resizeMode={Image.resizeMode.contain}
                                style={StyleSheet.flatten([GlobStyle.headerLogo])}/>
                        </Left>
                        <Body style={{alignItems:'center'}}></Body>
                        <Right style=  {{flex:1 }}>
                            <NBButton style={{width: 47, position:'relative', top:-3, marginRight: 0, paddingRight: 0}} transparent
                                      onPress={() => this.setState({
                                          'menuVisibility': !this.state.menuVisibility,
                                       }) }>
                                <FontAwesome style={{'color': Colors.cyen, fontSize: 35}} name='reorder'/>
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
                                 flexGrow: 1,
                                backgroundColor:Colors[config.colorsOrderList[this.state.currentBgColor]],
                             }}>
                            <View
                                style={ {
                                    flexDirection: 'row',
                                    marginTop: 15,
                                    paddingHorizontal:10,
                                    paddingBottom: 0
                                }}>
                                <View allowFontScaling={false} style={{
                                    alignSelf: 'center',
                                    marginRight:7,
                                 }}><Text allowFontScaling={false} style={{  fontSize:17,fontWeight:'bold',color:Colors.white,}} >
                                    Goal Name:</Text>
                                </View>
                                <Item   style={StyleSheet.flatten([{ flex:1, marginRight:5,  alignSelf: 'flex-end',},
                                    this.state.errors.GoalName ? { borderBottomWidth:0 } : {}])}>
                                    <Input
                                        style={StyleSheet.flatten([{  borderWidth: 1,  backgroundColor:Colors.white,    fontSize:19, paddingBottom:5,  borderRadius:5, paddingLeft: 5, borderColor: Colors.darkGray},
                                            this.state.errors.GoalName ? {  borderColor:'red'} : {}   ] ) }
                                        onFocus={(e)=>  this.setState({errors: {...this.state.errors, GoalName:false}})}
                                         value={this.state.GoalName}
                                        autoGrow={true}
                                        multiline={true}
                                        onChangeText={(val) => this.setState({'GoalName':   val })}
                                        />
                                </Item>
                            </View>

                            <View
                                style={ {
                                     marginTop: 35,
                                    paddingHorizontal:10,
                                    paddingBottom: 0
                                }}>
                                <Text allowFontScaling={false} style={{fontSize:17,  fontWeight:'bold', color:Colors.white, marginBottom: 3}}>
                                    Is this something you want to encourage or discourage?
                                </Text>
                                <View style={{  alignSelf: 'flex-start'   }}>
                                    <RadioButtons
                                        options={ [
                                            {
                                                label: 'Encourage',
                                                value: 'encourage'
                                            },
                                            {
                                                label: 'Discourage',
                                                value: 'discourage'
                                            }] }
                                        onSelection={ this.onGoalTypeSelect.bind(this)}
                                        selectedOption={this.state.GoalType }
                                        renderOption={ this.renderOption.bind(this) }
                                        renderContainer={ this.renderContainer }
                                    />
                                </View>
                            </View>


                                <View
                                    style={ {
                                         marginTop: 35,
                                        paddingHorizontal:10,
                                        paddingBottom: 0
                                    }}>
                                    <View allowFontScaling={false} style={{
                                        alignSelf: 'flex-start',
                                        marginRight:7,
                                      }}>
                                        <Text allowFontScaling={false}  style={{  fontSize:17,fontWeight:'bold', color:Colors.white,   }}>
                                       What does X represent for this goal?</Text>
                                        <Text allowFontScaling={false} style={{fontSize:17,  fontWeight:'bold', color:Colors.white }} >
                                           (So we can remind you later.)</Text>
                                    </View>
                                    <Item   style={StyleSheet.flatten([{ flex:1,  marginTop:5},
                                        this.state.errors.XRepresents ? { borderBottomWidth:0 } : {}])}>
                                        <Input
                                            style={StyleSheet.flatten([{  borderWidth: 1,  backgroundColor:Colors.white,    fontSize:19, paddingBottom:5,  borderRadius:5, paddingLeft: 5, borderColor: Colors.darkGray},
                                                this.state.errors.XRepresents ? {  borderColor:'red'} : {}   ] ) }
                                            onFocus={(e)=>  this.setState({errors: {...this.state.errors, XRepresents:false}})}
                                            value={this.state.XRepresents}
                                            autoGrow={true}
                                            multiline={true}
                                            onChangeText={(val) => this.setState({'XRepresents':   val })}
                                        />
                                    </Item>
                                </View>

                            <View
                                style={ {
                                    marginTop: 35,
                                    paddingHorizontal:10,
                                    paddingBottom: 0
                                }}>
                                <View allowFontScaling={false} style={{
                                    alignSelf: 'flex-start',
                                    marginRight:7,
                                }}>
                                    {this.state.GoalType == 'encourage' ?
                                        <Text allowFontScaling={false}
                                              style={{fontSize: 17, fontWeight: 'bold', color: Colors.white,}}>
                                            How many Xs represent your limit for your {this.state.GoalName} goal?</Text>
                                        :
                                        <Text allowFontScaling={false}
                                              style={{fontSize: 17, fontWeight: 'bold', color: Colors.white,}}>
                                            How many Xs do you want to encourage for your {this.state.GoalName} goal?</Text>
                                    }
                                </View>
                                <Item   style={StyleSheet.flatten([{ width:100, marginTop:8},
                                    this.state.errors.GoalNumber ? { borderBottomWidth:0 } : {}])}>
                                    <Input
                                        style={StyleSheet.flatten([{  borderWidth: 1,  backgroundColor:Colors.white,    fontSize:19, paddingBottom:5,  borderRadius:5, paddingLeft: 5, borderColor: Colors.darkGray},
                                            this.state.errors.GoalNumber ? {  borderColor:'red'} : {}   ] ) }
                                        onFocus={(e)=>  this.setState({errors: {...this.state.errors, GoalNumber:false}})}
                                        value={this.state.GoalNumber.toString()}
                                        autoGrow={true}
                                        multiline={true}
                                        onChangeText={(val) => this.setState({'GoalNumber':   val })}
                                    />
                                </Item>
                            </View>


                                <View  style={{
                                    alignSelf: 'flex-end',
                                    flexDirection:'row',
                                    marginRight:9,
                                    marginTop:55,
                                }}>
                                    <NBButton block
                                               style={StyleSheet.flatten([GlobStyle.mainButton, GlobStyle.buttonWithShadow, {marginRight:25,backgroundColor:Colors[config.secondaryColorsOrderList[this.state.currentBgColor]]}]) }
                                              onPress={() => this.goToNextScreen('goalList')}><Text allowFontScaling={false}
                                                                                    style={StyleSheet.flatten(GlobStyle.mainButtonText)}>Cancel</Text></NBButton>
                            <NBButton block
                                    disabled={  this.state.pending}
                                    style={StyleSheet.flatten([GlobStyle.mainButton, GlobStyle.buttonWithShadow, (this.state.pending) ? {backgroundColor: Colors.gray} : {backgroundColor:Colors[config.secondaryColorsOrderList[this.state.currentBgColor]]}]) }
                                    onPress={() => this.saveGoal()}><Text allowFontScaling={false}
                                                                                      style={StyleSheet.flatten(GlobStyle.mainButtonText)}>Save Goal</Text></NBButton>
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
export default connect(mapStateToProps, mapDispatchToProps)(GoalEditScreen);
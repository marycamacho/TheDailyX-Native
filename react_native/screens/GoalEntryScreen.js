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
import {FETCH_GOAL_DATA,UPDATE_GOAL} from "../constants/ActionTypes";
import uuid  from 'uuid';
import {FontAwesome,MaterialComunityIcons, EvilIcons} from '@expo/vector-icons';
 import {makeRequest, dispatchAction, userLogout} from "../actions/";
import {Colors, GlobStyle,Images} from "../Themes";
import {bindActionCreators} from "redux";
import {prepareDeviceStyles } from "../util/Utils";
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {connect} from "react-redux";
import config from  '../config';

var deviceStylesMap = {
    default: {
        entryItemImage: {
            width:40,
           height:40
        },
        goBackButtonPict: {
            fontSize: 20
        },
        numberPerRow:4,
    },
    'ipad_air,iphonex_landscape,ipad_pro10': {
        entryItemImage: {
            width:40,
            height:40
        },
    },

    ipad_pro12: {
        entryItemImage: {
            width:70,
            height:70
        },
    },

}

class GoalEntryScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false,
            menuVisibility:false,
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
        this.itemBoxWidth =50
        this.itemBoxHeight =50
        this.deviceStylesMap = prepareDeviceStyles(deviceStylesMap, this.props.appReducer.currentDevice)
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
    addEntry(item){
        console.log('in add entry',this.props.goalsReducer, item );

        var methodData = {
             'endpoint': '/goals',
            'type':'patch',
            'not_display_success_message': true,
         };
        var foundItem = _.find(this.props.goalsReducer.data, function (goal) {
            console.log('goal', goal, item );
            return item._id == goal._id;
        })
        console.log('foundItem', foundItem);
        if (foundItem) {
            var entryID = uuid.v4()
            this.props.dispatchAction({
                ...item,
                GoalEntries: _.isUndefined(foundItem.GoalEntries) ? [{entryID:entryID, createdAt: new Date()}] : _.concat(foundItem.GoalEntries, [{entryID:entryID,createdAt: new Date()}]),
            }, UPDATE_GOAL)

                this.props.makeRequest({
                        UserID:this.props.User.user._id,
                        id:item._id,
                        GoalEntries: _.isUndefined(foundItem.GoalEntries) ?  [{createdAt:new Date()}] : _.concat(foundItem.GoalEntries,[{createdAt:new Date()}]),
                    }, methodData).then(response => {
                console.log('response',response );

            }).catch((err) => {
                    var foundGoal = _.find(this.props.goalsReducer.data, goal =>{
                        return goal._id == item._id;
                    })
                    if (foundGoal) {
                        var entryToDeleteIndex = _.findIndex(foundGoal.GoalEntries, item => {
                            return !_.isUndefined(item.entryID) && item.entryID == entryID
                        })
                        if (entryToDeleteIndex !== -1) {
                            this.props.dispatchAction({
                                ...item,
                                GoalEntries: [...foundGoal.GoalEntries.slice(0, entryToDeleteIndex),
                                    ...foundGoal.GoalEntries.slice(entryToDeleteIndex + 1)]
                            }, UPDATE_GOAL)
                        }
                    }
            })

        }
    }
    componentWillReceiveProps(nextProps) {
            this.updateListData(nextProps.goalsReducer.data)
    }
    updateListData(items) {
        console.log('in update list');
        this.setState({
            items: items,
            ds: this.state.ds.cloneWithRows(items)
        })
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
    // displayMetricBoxes(item){
    //      return _.map(item.GoalEntries, function (entry) {
    //         return (<MetricBox key={record.value} onClick={(e)=>this.props.search({'SellerID':record.value})} className="seller-select-button">{record.label}</MetricBox>);
    //     }.bind(this))
    // }
    _renderRow(item, sectionID, rowID) {
        console.log('item1', item ,this.deviceStylesMap);
        // item.GoalEntries = [
        //     {createdAt:'2018-01-29 17:30:59.229Z'},{createdAt:'2018-01-29 17:30:59.229Z'},{createdAt:'2018-01-29 17:30:59.229Z'},
        //
        // ];
        var numberOfEmptyBoxes = 0;
        console.log('GoalEntries',item.GoalNumber ,item.GoalEntries  );
        if ((item.GoalNumber - _.size(item.GoalEntries)) > this.deviceStylesMap.numberPerRow) {
           numberOfEmptyBoxes = this.deviceStylesMap.numberPerRow;
       } else {
           numberOfEmptyBoxes = (item.GoalNumber - _.size(item.GoalEntries)) > 0 ? (item.GoalNumber - _.size(item.GoalEntries)) : 0;
       }
       var emptyBoxes = _.range(0, numberOfEmptyBoxes)
console.log('numberOfEmptyBoxes',emptyBoxes,numberOfEmptyBoxes );
        if (_.isUndefined(item._id)) {
            return <View></View>
        }


        return (
            <View style={{
                flex:1,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor:Colors[config.colorsOrderList[parseInt(rowID) % 3]],
                paddingHorizontal: 10,
                flexDirection: 'column'
            }}
                  key={ rowID}>

                <View style={{ width:'80%', alignSelf:'center', }}>
                    <View style={{ flex:1,  marginBottom:4,
                        justifyContent:'center', }}>
                        <H3 allowFontScaling={false} style={{
                            lineHeight: 25,
                            fontSize: 20,
                            color:Colors.white,
                            fontWeight: '700'
                        }}>{item.GoalName}</H3>
                    </View>

                    <View style={{  flexWrap: 'wrap', flexDirection:'row',   alignSelf:'flex-start' , justifyContent:'flex-start' }}>
                        {  _.map(_.concat(item.GoalEntries, emptyBoxes), (entry, index)=>{
                            return <TouchableOpacity
                                onPress={()=>this.addEntry(item)}
                                key={index} style={StyleSheet.flatten([{    marginTop:6, marginRight:5,   }])}>

                                <View
                                     //     onLayout={(event) => {
                                    //     var {x, y, width, height} = event.nativeEvent.layout;
                                    //     console.log('onlayout',x, y, width, height );
                                    //     this.itemBoxWidth =width
                                    //     this.itemBoxHeight =height
                                    // }}
                                >
                                    <Text style={StyleSheet.flatten([{
                                        paddingHorizontal: 5,
                                        borderRadius: 10,
                                        borderWidth: 3,
                                        borderColor: Colors.white,
                                        alignItems:'flex-start', justifyContent:'flex-start', alignSelf:'flex-start',
                                    }])}>

                                        <FontAwesome style={StyleSheet.flatten([{color: Colors.white, fontSize: 40}, _.isObject(entry) ? {} : { color: Colors[config.colorsOrderList[parseInt(rowID) % 3]], backgroundColor:Colors[config.colorsOrderList[parseInt(rowID) % 3]]} ])} name='remove'/>

                                        {/*<Image*/}
                                        {/*source={Images.fullEntryImage}*/}
                                        {/*resizeMode={Image.resizeMode.contain}*/}
                                        {/*style={{ width:35, height:35}}/>*/}
                                    </Text>
                                </View>

                                {index ==0 &&
                                <View style={{position:'absolute',  top:10,  left:24, height:30, backgroundColor:Colors[config.colorsOrderList[parseInt(rowID) % 3]]}}>
                                    <FontAwesome style={{   color: Colors[config.colorsOrderList[parseInt(rowID) % 3]], backgroundColor:Colors[config.colorsOrderList[parseInt(rowID) % 3]], fontSize: 23}} name='remove'/>
                                </View>}
                            </TouchableOpacity>
                        })}
                    </View>
                </View>
            </View>
        )
    }
    render() {
        console.log('this state goal entry',this.itemBoxWidth, this.itemBoxHeight,  )
      //  this.deviceStylesMap[this.props.appReducer.currentDevice.title] );
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
                        <Body style={{alignItems:'center'}}>

                        </Body>
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
                                        onPress={() =>this.goToNextScreen('goalAdd')}>
                                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                                            <Text style={{
                                                color:Colors.white,
                                                marginRight: 10,
                                                fontSize: 16
                                            }}
                                                  allowFontScaling={false}>
                                                Add or Edit Goals</Text>
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

                        {this.props.goalsReducer.fetched ?
                            <View style={ {flex: 1}}>
                                {_.size(this.props.goalsReducer.data) > 0  &&
                                    (<View style={{flex: 1}}>
                                        <ListView
                                            enableEmptySections={ true }
                                            style={{flex: 1}}
                                            removeClippedSubviews={false}
                                            automaticallyAdjustContentInsets={ false }
                                            ref='listView'
                                            dataSource={ this.state.ds }
                                            renderRow={ (row, sectionID, rowID) => this._renderRow(row, sectionID, rowID) }/>
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
        appReducer:state.appReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        makeRequest,userLogout,dispatchAction
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GoalEntryScreen);
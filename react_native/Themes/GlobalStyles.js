import {Dimensions, Platform, StyleSheet} from "react-native";

import Colors from "./Colors";
import _ from 'lodash';

import config from "../config";

const {height, width} = Dimensions.get('window');


export default  StyleSheet.create({

    container: {
        backgroundColor: 'white',
        marginBottom: 50
    },
    content: {
        backgroundColor: 'white',
        borderWidth: 0,
    },
    center: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    radioBtnOuterCircle: {
        width: 17,
        height: 17,
        borderRadius: 100 / 2,
        borderColor:Colors.white,
         borderWidth: 1,
        justifyContent:'center',
    },
    radioBtnInnerCircle: {
        width: 9,
        height: 9,
        borderRadius: 100 / 2,
         borderWidth: 0
    },
    buttonWithShadow:{
        borderWidth:1,
        borderColor:Colors.darkGray,
        shadowColor: Colors.darkGray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    mainButton: {
      backgroundColor: Colors.cyen,
        alignItems: 'center',
        borderRadius: 5,
        height: 40
    },
    headerLogo : {
        width: 210,
        height: 80
    },
    mainButtonText: {
        fontSize: 16,
        lineHeight: 16,
        marginTop: 3,
        marginLeft: 2, /* to center text correctly */
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    centerHorizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textCenter: {
        textAlign: 'center',
    },


});

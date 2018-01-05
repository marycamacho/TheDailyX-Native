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
    mainButton: {
        //  backgroundColor: Colors.lightGreen,
        alignItems: 'center',
        borderRadius: 5,
        height: 40
    },
    headerLogo : {
        width: 210,
        height: 80
    },
    mainButtonText: {
        color: '#fff',
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

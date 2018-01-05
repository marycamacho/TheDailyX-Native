import env from './env';
export default {
    // App Details
    getEnvironment: function () {
        return this.environments[env.environment]
    },
    getEnvironmentName: function () {
        return env.environment
    },
    environments: {
        production: {},

        development: {},
        local: {
            serverBaseURL:'http://localhost:3039',
        },
    },

    appName: 'DailyX',
    appVersion: 1,
    appVersionNumber: 1,
    versionManifest: {
        // Reloading many times won't change nothing till a higher version is added
        // to the manifest.
        1: (state) => state,
        // 2: (state) => {
        //     return _.assign({}, state, {
        //         appSettingsReducer: _.assign({expand: 'state'}, state.appSettingsReducer)
        //     });
        // }
        // // You can skip versions, the manifest will always go for the higher
        // 4: (state) => assign({}, state, {
        //     app: _.omit(state.app, 'expand')
        // }),
    },
    Facebook:{
         ClientID:''
    },
    Google:{
        IOSClientID:''
    },
    deviceMap: [
        {
            width: 375,
            height: 667,
            orientation: 'portrait',
            type: 'iphone',
            version: 'iphone6',
            screensize: 2,
            title: 'iphone6_portrait'
        },
        {
            width: 667,
            height: 375,
            orientation: 'landscape',
            type: 'iphone',
            version: 'iphone6',
            screensize: 2,
            title: 'iphone6_landscape'
        },
        {
            width: 320,
            height: 568,
            orientation: 'portrait',
            type: 'iphone',
            version: 'iphone5',
            screensize: 1,
            title: 'iphone5_portrait'
        },
        {
            width: 568,
            height: 320,
            orientation: 'landscape',
            type: 'iphone',
            version: 'iphone5',
            screensize: 1,
            title: 'iphone5_landscape'
        },
        {
            width: 375,
            height: 812,
            orientation: 'portrait',
            type: 'iphone',
            version: 'iphonex',
            screensize: 3,
            title: 'iphonex_portrait'
        },
        {
            width: 812,
            height: 375,
            orientation: 'landscape',
            type: 'iphone',
            version: 'iphonex',
            screensize: 3,
            title: 'iphonex_landscape'
        },
        {
            width: 414,
            height: 736,
            orientation: 'portrait',
            type: 'iphone',
            version: 'iphone6_plus',
            screensize: 3,
            title: 'iphone6_plus_portrait'
        },
        {
            width: 736,
            height: 414,
            orientation: 'landscape',
            type: 'iphone',
            version: 'iphone6_plus',
            screensize: 3,
            title: 'iphone6_plus_landscape'
        },
        {
            width: 768,
            height: 1024,
            orientation: 'portrait',
            type: 'ipad',
            version: 'ipad_air',
            screensize: 4,
            title: 'ipad_air_portrait'
        },
        {
            width: 1024,
            height: 768,
            orientation: 'landscape',
            type: 'ipad',
            version: 'ipad_air',
            screensize: 4,
            title: 'ipad_air_landscape'
        },
        {
            width: 834,
            height: 1112,
            orientation: 'portrait',
            type: 'ipad',
            version: 'ipad_pro10',
            screensize: 5,
            title: 'ipad_pro10_portrait'
        },
        {
            width: 1112,
            height: 834,
            orientation: 'landscape',
            type: 'ipad',
            version: 'ipad_pro10',
            screensize: 5,
            title: 'ipad_pro10_landscape'
        },
        {
            width: 1024,
            height: 1366,
            orientation: 'portrait',
            type: 'ipad',
            version: 'ipad_pro12',
            screensize: 6,
            title: 'ipad_pro12_portrait'
        },
        {
            width: 1366,
            height: 1024,
            orientation: 'landscape',
            type: 'ipad',
            version: 'ipad_pro12',
            screensize: 6,
            title: 'ipad_pro12_landscape'
        },
    ],

    clientMessages: {
        recordDeleted: '#1# has been deleted',
        recordUpdated: '#1# has been updated',
        recordAdded: '#1# has been created',
        errorSomethingWrong: 'Something went wrong',
        errorSomethingWrongDefault: 'Sorry, it seems some error occurred',
        errorTokenExists: 'Facebook token not available',
        errorConnection: 'Internet connection or server is not available',
        timeoutRequestExceeded: 'Please, check if Internet connection is available',
        warningFacebookAccountChanged: 'It seems you changed Facebook account. Please, try sign up again',
    },
    apiErrorCodeMap: {
        10: 'UserNotFoundOnFacebookSignIn',
        11: 'UserAlreadyExistsOnSignUp',
        12: 'AccessTokenNotValid',
        13: 'FacebookEmailNotAvailableSignUp',

    },
    // Build Configuration - eg. Debug or Release?
    DEV: __DEV__,
}

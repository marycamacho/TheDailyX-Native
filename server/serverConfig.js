var jwt = require('jsonwebtoken');
module.exports = {
    JWTSecret: 'secret218^&*^%$#$23S7deh89',
    jwtTokenValidateValue: '',
    mailer: {
        from: '',
        to: '',
     },
    getEnvironment: function () {
        return this.environments[process.env.NODE_ENV]
    },
    environments: {
        production: {
            mongo: {
                connection: ''
            },
        },

        staging: {},
        development: {
            mongo: {
                connection: ''
            },
        },
        local: {
            mongo: {
                 connection: '',
            },
        }
    },
    createJwt: function(data, config={}) {
        return jwt.sign(data, this.JWTSecret, {
            expiresIn: config.expiresIn ||  '1 day', // if number, it is in seconds
            issuer: 'DAILYX_APP'
        });
    },
    Facebook:{
        requestDataUrl: 'https://graph.facebook.com',
    },
    Google:{
        requestDataUrl: 'https://www.googleapis.com/userinfo/v2',
    },
    templateEngine: 'handlebars',
    apiMessages: {
        errorParameterNotSpecified: '#1# not specified',
        errorRecordNotFound: '#1# not found',
        errorPermissions: 'Resource access denied',
        errorSomethingWrong: 'Something went wrong',
    }
}
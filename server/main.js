(function () {
    "use strict";


    var path = require('path');
     var PORT = process.env.PORT || 8081;
    var express = require('express');
    var bodyParser = require('body-parser');

     var serverConfig = require(path.resolve('./serverConfig.js'));
    var app = express();
    var User = require(path.resolve('./server/models/user'));

    var _ = require('lodash');
    var errorHandler = require('./server/error-handler');
    var exphbs = require('express-handlebars');
     var jwt = require('jsonwebtoken');
    var request = require('request');
    var randomstring = require("randomstring");
    var util = require(path.resolve('./server/util'));
    // Set the template engine
    app.engine('handlebars', exphbs());
    // Set views path and view engine
    app.set('view engine', 'handlebars');
    app.set('views', './');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    var tokenRoutes = []
    var tokenRoutesRegex = [
         {'route': /^\/users.*$/, method: 'ALL'},
    ];

    var include = function (restrictedPaths, restrictedPathsRegex, middleware) {
        return function (req, res, next) {
            if (_.some(restrictedPaths, {'route': req.path, 'method': req.method})) {
                return middleware(req, res, next);
            } else {
                var matchFound = false;
                _.forEach(restrictedPathsRegex, function (restrictedPath, key) {
                    if (req.path.match(restrictedPath.route) && ( restrictedPath.method == 'ALL' || req.method == restrictedPath.method)) {
                        matchFound = true;
                    }
                });
                if (matchFound) {
                    return middleware(req, res, next);
                } else {
                    return next();
                }
            }
        };
    };
    app.use(include(tokenRoutes, tokenRoutesRegex, function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.headers['x-access-token'];
        // decode token
        if (token) {
            jwt.verify(token, serverConfig.JWTSecret, {'ignoreExpiration': true}, function (err, decoded) {

                if (err) {
                    // if (err.name === 'TokenExpiredError') {
                    //     return next({clientMessage: 'TokenExpiredError', 'errorCode': 12});
                    //
                    // }
                    return next({
                        errorCode: 12,
                        clientMessage: 'Failed to authenticate token',
                        notificationErrorData: {additionalData: 'token is not valid', tokenError: err}
                    });
                } else {
                    User.find({
                        _id: new Buffer(decoded.UserID, 'base64').toString('hex'),
                        jwtTokenHash: decoded.jwtTokenHash
                    }, {_id: 1}).limit(1).count().exec(function (err, exists) {
                        if (err) return next(err);
                        if (!exists) {
                            return next({
                                clientMessage: 'Failed to authenticate token',
                                notificationErrorData: {
                                    additionalData: 'user not found',
                                    token: token,
                                    decoded: decoded
                                },
                                errorCode: 12
                            });
                        }
                        req.decoded = decoded;
                        return next();
                    });
                }
            });
        } else {
            return next({clientMessage: 'Access token not provided'});
       }
    }));

    require('./server/mongo-connection')(function (err, dbConnection) {
        if (err) {
            console.log('no db connection');
            return
        }

        app.post('/test', function (req, res, next) {

          //  var promise = require('./server/ )()(req, res,  next);

            // promise.then(function (response) {
            //     return res.send(response);
            // }).catch(function (error) {
            //     return next(error);
            // });
        });

        // // // // // // // // // // // USERS // // // // // // // // // // // //

        app.get('/users', function (req, res, next) {
            if (!util.permissionsCheck(['Administrator'], req.decoded ? req.decoded : {})) {
                return next({clientMessage: 'errorPermissions'});
            }
            require('./server/api/users/get')()(req, res).then(function (response) {
                return res.send(response);
            }).catch(function (error) {
                return next(error);
            });
        });
        app.post('/get-user-data', function (req, res, next) {
            require('./server/api/users/getUserData')()(req, res, next);
        });



        app.post('/authenticate', function (req, res, next) {
            if (req.body.type == 'Facebook') {
                require('./server/api/users/authenticateFacebook')()(req, res, next);
            } else {
                require('./server/api/users/authenticateGoogle')()(req, res, next);
            }
        });

        app.patch('/users/:id', function (req, res, next) {
            if (!( req.params.id == req.decoded.UserID || util.permissionsCheck(['Administrator'], req.decoded))) {
                return next({clientMessage: 'errorPermissions'});
            }
            require('./server/api/users/update')()(req, res, next);
        });

        // // // // // // // // // // // USERS // // // // // // // // // // // //

        /* handleerror*/
        app.use(function (err, req, res, next) {
            res.status(err.status || 400);
            var error = errorHandler.getErrorObject(err);
            if (_.isUndefined(err.doNotSendError) && process.env.NODE_ENV !== 'local' && !_.isUndefined(process.env.NPM_USE_REMOTE)) {
                req.body = req.body ? req.body : {};
                req.body.errorMessage = _.clone(error);
                if (!_.isUndefined(err.notificationErrorData)) {
                    _.extend(req.body.errorMessage, err.notificationErrorData);
                }
                req.body.errorData = _.omit(err, 'notificationErrorData');
                req.body.type = 'server_error';
                require('./server/common/sendErrorEmail')(req, res, next);
            }
            return res.send(error);
        });

        var server = app.listen(PORT, function () {
            console.log("server started on port " + PORT, process.env.NODE_ENV);
        });
        server.timeout = 500000;

    });

}());
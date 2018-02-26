var path = require('path'),
    User = require(path.resolve('./server/models/user')),
    Goal = require(path.resolve('./server/models/goal')),
     _ = require('lodash'),
    async = require('async'),
    util = require(path.resolve('./server/util')),
    Q = require('q');


module.exports = function () {
    return function (req, res) {
         var deferred = Q.defer();

         var functionsToCall = [], queries = [];
        if (!_.isUndefined(req.query.UserID)) {
            if (!(util.permissionsCheck(['Administrator'], req.decoded) ||
                (util.permissionsCheck(['User'], req.decoded) && req.query.UserID == req.decoded.UserID ))) {
                return Q.reject({clientMessage: 'errorPermissions'});
            }
            prepareUserIDQuery(queries);
        } else {
            if (!( util.permissionsCheck(['Administrator'], req.decoded))) {
                return Q.reject({clientMessage: 'errorPermissions'});
            }
        }

         if (queries.length == 0){
            queries.push({'$match':{}})
        }

        functionsToCall.push(function (done) {
            fetchRecords(queries, done);
        });


        processRequest(functionsToCall);

        function prepareUserIDQuery(queries) {
            var mongo = require('mongodb');
            queries.push({
                "$match": {
                    UserID: new mongo.Binary(new Buffer(req.query.UserID, 'base64'), 4)
                }
            });
        }

        function processRequest(functionsToCall) {
            async.parallel(functionsToCall,
                function (err, foundDateRules) {
                    if (err) {
                        return deferred.reject(err);
                    }
                    var dataToReturn = {
                        'data': foundDateRules[0]
                    };
                     deferred.resolve(dataToReturn);
                });
        }

        function fetchRecords(queries, done) {
            Goal.aggregate(queries).exec(function (err, foundRecords) {
                done(err, foundRecords);
            });
        }

        return deferred.promise;
    }
};

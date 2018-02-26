var path = require('path'),
    User = require(path.resolve('./server/models/user')),
    Goal = require(path.resolve('./server/models/goal')),
    _ = require('lodash'),
    util = require(path.resolve('./server/util')),
    Q = require('q');
module.exports = function () {

    return function (req) {
        var deferred = Q.defer();

        if (!(util.permissionsCheck(['Administrator'], req.decoded) ||
            (util.permissionsCheck(['User'], req.decoded) && req.body.UserID == req.decoded.UserID ))) {
            return Q.reject({clientMessage: 'errorPermissions'});
        }
        req.body.UserID =  util.Base64ToHexUUID(req.body.UserID);
        var objectToCreate = new Goal(_.omit(req.body, ['_id']));

        objectToCreate.save(
            function (err, savedRecord) {
                if (err) {
                    return  deferred.reject(err)
                }
                deferred.resolve(savedRecord);
            });
        return deferred.promise;
    }

};
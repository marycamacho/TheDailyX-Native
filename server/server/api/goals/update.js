var path = require('path'),
    Goal = require(path.resolve('./server/models/goal')),
    User = require(path.resolve('./server/models/user')),
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
        Goal.findOne({'_id': new Buffer(req.body.id, 'base64').toString('hex')}, function (err, record) {
            if (err) return deferred.reject(err);
            if (!record)  return deferred.reject({
                'status': 404,
                'clientMessage': 'errorRecordNotFound',
                'messageData': {'#1#': 'Goal'}
            });
            var updateFields = _.omit(req.body, ['_id', 'UserID', 'createdAt', 'updatedAt']);
            // if (!_.isUndefined(updateFields.GoalEntries)){
            //     updateFields.GoalEntries = _.map(updateFields.GoalEntries, function (goalEntry) {
            //        return _.omit(goalEntry, [ 'createdAt', 'updatedAt']);
            //     })
            // }
            record.update(
                {
                    $set: updateFields
                }, function (err, updatedRecord) {
                    if (err) {
                        return deferred.reject(err);
                    }
                    if (updatedRecord.n) {
                        deferred.resolve(_.extend(record.toObject(),updateFields) );
                    } else {
                        return deferred.reject({
                            'clientMessage': 'errorSomethingWrong',
                        });
                    }
                });


        });
        return deferred.promise;
    }

};


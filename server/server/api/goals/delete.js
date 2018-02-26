var path = require('path'),
    Q = require('q'),
    dateRule = require(path.resolve('./server/models/dateRule'));

module.exports = function () {
    return function (req) {
        var deferred = Q.defer();
        dateRule.remove({ _id: new Buffer(req.query.id, 'base64').toString('hex') }, function (err, record) {
            if (err)  return  deferred.reject(err)
            if (record.result.n !== 1)   return  deferred.reject({'status':404,'clientMessage': 'errorRecordNotFound', 'messageData': {'#1#': 'Rule record'}});
            deferred.resolve({'data':'ok'});
        });
        return deferred.promise;
    }
};
var path = require('path'),
    User = require(path.resolve('./server/models/user')),
    _ = require('lodash'),
    uuid = require('node-uuid'),
    Q = require('q');
module.exports = function () {

    return function (req) {
        var deferred = Q.defer();
          var objectToCreate = new User(_.omit(req.body, ['createdAt','_id',  'Roles' ]));
        objectToCreate.save(
            function (err, savedRecord) {
                if (err) {
                    deferred.reject(err)
                }
                deferred.resolve(savedRecord)
             });
        return deferred.promise;
    }

};
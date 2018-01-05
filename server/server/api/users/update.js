var path = require('path'),
    User = require(path.resolve('./src/models/user')),
    async = require('async'),
    bcrypt = require('bcrypt'),
  util = require(path.resolve('./server/util')),
    serverConfig = require(path.resolve('./serverConfig')),
    _ = require('lodash');

module.exports = function () {
    return function (req, res, next) {
        var updateFields = _.omit(req.body, ['createdAt',  '_id', 'Facebook',  'jwtTokenHash']);
       if (updateFields.email){
           updateFields.email = updateFields.email.trim()
       }
        User.findOne({'_id': new Buffer(req.params.id, 'base64').toString('hex')}).exec(function (err, record) {
            if (err) return next(err);
            if (!record) return next({
                'status': 404,
                'clientMessage': 'errorRecordNotFound',
                'messageData': {'#1#': 'User'}
            });



        });

    }
}
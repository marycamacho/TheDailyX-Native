var path = require('path'),
    User = require(path.resolve('./src/models/user')),

    config = require(path.resolve('./config')),
    async = require('async');
module.exports = function (methodName) {

    return function (req, res, next) {
        //return next({'clientMessage': 'errorFieldMissing', 'messageData': {'#1#': 'Email'}});

            User.findOne({_id:new Buffer(req.decoded.UserID, 'base64').toString('hex')}).lean().exec(function (err, user) {
                if (err)  return next(err);

                    async.parallel(
                        {
                            'Seller': function (done) {
                                Seller.findOne({UserID: user._id}).lean().exec(function (err, record) {
                                    done(err, record);
                                })
                            },
                            'Buyer': function (done) {
                                Buyer.findOne({UserID: user._id}).lean().exec(function (err, record) {
                                    done(err, record);
                                })
                            }
                        },
                        function (err, foundResult) {
                            if (err) {
                                return next(err);
                            }
                            res.send({
                                'User': user,
                                'Buyer': foundResult.Buyer ? foundResult.Buyer : {},
                                'Seller': foundResult.Seller ? foundResult.Seller : {},
                            });
                        });
        }).catch(function (error) {
            return next(error);
        });
    }

};
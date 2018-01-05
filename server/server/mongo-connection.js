var mongoose = require('mongoose'),
 path = require('path'),
     serverConfig = require(path.resolve('./serverConfig'));
var url = serverConfig.getEnvironment().mongo.connection;




/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments1.
 */
var options = {
    useMongoClient: true,
    keepAlive: 4600000,
    connectTimeoutMS: 460000,
    reconnectTries: 50,
    reconnectInterval: 2000 ,
};

module.exports = function (cb) {
     mongoose.connect(url, options, cb);
};
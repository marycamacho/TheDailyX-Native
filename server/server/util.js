var _ = require('lodash');
var path = require('path');
 


 
const data = {
    Base64ToHexUUID : function (bin){
        var hex = new Buffer(bin, 'base64').toString('hex');
        return hex.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, function (){
            return arguments[1]+"-"+arguments[2]+"-"+arguments[3]+"-"+arguments[4]+"-"+arguments[5];
        });
    },
    HexUUIDToBase64 : function (hex){
        var hexReplaced = hex.replace(/-/g, '');
        return new Buffer(hexReplaced, 'hex').toString('base64');
    },
    permissionsCheck : function(allowedRoles, decoded = {})  {
        if (_.isUndefined(decoded.Roles)){
            return false;
        } else{
            return _.size(_.intersection(allowedRoles, decoded.Roles)) > 0;
        }
    },
    removePrefix(string, prefix){
        string = _.trim(string)
        return string.startsWith(prefix) ? string.slice(prefix.length) : string
    },
    removeSuffix(string, suffix){
        string = _.trim(string)
        return string.endsWith(suffix) ? string.slice(0, -suffix.length) : string
    },
    
}
module.exports = data;
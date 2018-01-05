var uuid = require('node-uuid');
var mongoose = require('mongoose');
var _ = require('lodash');

require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;
var User = mongoose.Schema;

var FacebookSchema = new mongoose.Schema({
    ProfileID: {type:String, required:true},
},{ _id: false });
var GoogleSchema = new mongoose.Schema({
    ProfileID: {type:String, required:true},
},{ _id: false });

var userSchema = new User({
     _id: { type: UUID, default: uuid.v4 },
    FirstName: {type: String, required:'{PATH} is required!'},
    LastName:  {type: String, default:''},
     Roles:{ type: Array, enum: ['User',  'Administrator'] , default:['User']},
    Email: {
        type: String,
        required:true,
         trim: true,
         unique: true,
        validate: [ function(property) {
            return  property.length;
        }, 'Please fill in your email'],
         match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']
    },
    jwtTokenHash: { /* included in jwt tokens and changed on password reset to invalidate other tokens */
        type: String,
        select: false,
        default:''
    },
    Facebook: {
        select: false,
        type: FacebookSchema
    },
    Google: {
        select: false,
        type:GoogleSchema
    },
}, { collection: 'users', timestamps: true }, { id: false });
userSchema.path('Facebook').validate(function (value) {
    if(_.isUndefined(value.ProfileID )){
        return false;
    }
}, 'Facebook profile ID is required');
userSchema.path('Google').validate(function (value) {
    if(_.isUndefined(value.ProfileID )){
        return false;
    }
}, 'Google profile ID is required');
module.exports = mongoose.model('User', userSchema);
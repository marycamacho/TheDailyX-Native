var uuid = require('node-uuid');
var mongoose = require('mongoose');
var _ = require('lodash');

require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;
var Goal = mongoose.Schema;
var User = require('./user');
var GoalEntrySchema = new mongoose.Schema({
 }, {  timestamps: true });
var goalSchema = new Goal({
     _id: { type: UUID, default: uuid.v4 },
    UserID: {type: UUID, ref: 'User'},
    GoalName: {type: String, required: [true, 'Goal Name is a required field']},
    GoalType: {type: String, enum: ["encourage", "discourage"],  default: "encourage"},
    GoalNumber:  {type: Number,  required: [true, 'Goal number is a required field']},
    GoalEntries:[GoalEntrySchema],
    XRepresents:  {type: String,  required: [true, 'XRepresent is a required field']},
}, { collection: 'goals', timestamps: true }, { id: false });

module.exports = mongoose.model('Goal', goalSchema);
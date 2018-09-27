var mongoose = require('mongoose');
var mongooseTimestamp = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var trip=require('../models/trip');

var expense = new Schema({
    _trip:{ type: Schema.Types.ObjectId, ref: 'trip'},
    expenseDescription: String,
    expenseAmount: Number,
    expenseDate: { type: Date, default: Date.now },
    expenseCategory: String,
    shared_by: [{ personId:{ type: Schema.Types.ObjectId, ref: 'person'},spent:Number}],
    paid_by: [{ personId: { type: Schema.Types.ObjectId, ref: 'person'},paidAmount: Number }],
    expenseType:String,
    shareType:String
})
expense.plugin(mongooseTimestamp);
mongoose.model('expense', expense);
module.exports = mongoose.model('expense', expense);
/*
{	"_id":"5ba367759843ad35ee802f66",
	"tripId":2,
	"expenseDescription":"hotel",
	"expenseAmount":1000,
	"expenseCategory":"Travel",
	"shared_by":[{"name":"user1","spent":500},{"name":"user2","spent":500}],
	"expenseType":"personal",
    "paid_by":[{"name":"demo","paidAmount":600},{"name":"test","paidAmount":400}]}
*/
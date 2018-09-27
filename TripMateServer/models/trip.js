var mongoose = require('mongoose');
var mongooseTimestamp = require("mongoose-timestamp");
var Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);
var expense=require('../models/expense');
var person=require('../models/person');

var trip = new Schema({
    tripName: { type: String, required: true },
    places: [{ type: String, required: true }],
    tripDate: { type: Date, default: Date.now },
    expense:[{ type: Schema.Types.ObjectId, ref: 'expense'}],
    person: [{ type: Schema.Types.ObjectId, ref: 'person'}],
    tripCode: String,
    userEmail: { type: String, required: true },

});

// trip.plugin(AutoIncrement, { inc_field: 'tripId' });
trip.plugin(mongooseTimestamp);
mongoose.model('trip', trip);
module.exports = mongoose.model('trip', trip);
/***
 * {"tripName":"Mumbai",
	"userEmail":"test@gmail.com",
	"places":["bandra","Navi Mumbai","India Gate"],
	"tripDate":"2018/09/19",
	"person":[{
		"name":"user1",
		"Mobile":1236547891,
		"email":"test@gmail.com",
		"deposit":1000
	},{
		"name":"user2",
		"Mobile":1236547891,
		"email":"demo@gmail.com",
		"deposit":1000
    }]}
    

    person: [{
        name: { type: String, required: true },
        Mobile: Number,
        email: { type: String, required: true },
        deposit: { type: Number, default: 0 },
        personalDetails: {
            depositAmountGiven: { type: Number, default: 0 },
            depositAmountSpent: { type: Number, default: 0 },
            depositAmountRemaining: { type: Number, default: 0 },
            personalAmount: { type: Number, default: 0 },
            personalAmountSpent: { type: Number, default: 0 },
            totalAmount: { type: Number, default: 0 },
            totalAmountSpent: { type: Number, default: 0 },
            totalAmountRefundDue: { type: Number, default: 0 }
        }
    }],
 */
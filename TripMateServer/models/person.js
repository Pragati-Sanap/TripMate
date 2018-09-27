var mongoose=require('mongoose');
var mongooseTimestamp=require('mongoose-timestamp');
var Schema=mongoose.Schema;

var person=new Schema({
        name: { type: String, required: true },
        _trip:{ type: Schema.Types.ObjectId, ref: 'trip'},
        tripcode:String,
        mobile: Number,
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
   })
person.plugin(mongooseTimestamp);
mongoose.model('person', person);
module.exports = mongoose.model('person', person);
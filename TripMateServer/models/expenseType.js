var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var expense=require('../models/expense');

var expenseType=new Schema({
    category:String,
    _expense:[{ type: Schema.Types.ObjectId, ref: 'expense' }]
})

module.exports= mongoose.model('expenseType', expenseType);
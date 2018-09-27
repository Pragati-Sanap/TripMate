var typeModel = require('../models/expenseType');
var expense = require('../models/expense');
var trip = require('../models/trip');
var expenseTypes = {

    create: function (req, res) {
        var type = new typeModel;
        type.category = req.body.category;
        type.save(function (err, doc) {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'error in creating expenseType', docs: err });
            }
            else {
                res.status(200).json({ status: 'success', message: 'expenseType created success', docs: doc });
            }
        })
    },
    getTypes: function (req, res) {
        typeModel.find({}, function (err, docs) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'error in getting expenseType', docs: err });
            }
            else {
                console.log(docs.name);
                res.status(200).json({ status: 'success', message: 'success expenseType', docs: docs });
            }
        })
    },
    populate: function (req, res) {
        typeModel.findOne({ category: req.body.category })
            .populate('_expense')
            .exec(function (err, exp) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'error in getting expenseType', docs: err });
                    console.log('err');
                }
                else {
                    console.log(exp._expense.length);
                    console.log(exp);
                    res.status(200).json({ status: 'success', message: 'success expenseType', docs: docs });
                }
            })
    },
}

module.exports = expenseTypes;
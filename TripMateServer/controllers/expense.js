var expenseModel = require('../models/expense');
// var typeModel = require('../models/expenseType');
var tripModel = require('../models/trip');
var personModel = require('../models/person');
persons: [];
amount: Number;
totalDeposit: Number;
expenseType:{
  deposit: [];
  personal: [];
}
var expenses = {
  create: function (req, res) {
    var expense = new expenseModel();
    tripModel.findOne({ _id: req.body._id }, function (err, docs) {
      console.log("docs " + "\n" + docs);
      if (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err, docs: '' });
      }
      else {
        expense._trip = docs._id;
        expense.expenseDescription = req.body.expenseDescription;
        expense.expenseAmount = req.body.expenseAmount;
        expense.expenseDate = new Date();//format:YYYY/MM/DD
        expense.expenseCategory = req.body.expenseCategory;
        expense.shareType = req.body.shareType;
        expense.expenseType = req.body.expenseType;
        expense.shared_by = req.body.shared_by;
        expense.paid_by = req.body.paid_by;
        console.log(req.body.expenseType);
        expense.save(function (err, expense) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("expense doc")
            console.log(expense);
            tripModel.findOne({ _id: req.body._id }, function (err, docs) {
              console.log(expense._id);
              docs.expense.push(expense._id);
              docs.save(function (err, doc) {
                if (err) {
                  console.log(err);
                }
                else {
                  console.log("Trip expense id")
                  for (i = 0; i < doc.person.length; i++) {
                    console.log(doc.person[i]);
                  }
                }
              });
            })
            res.status(200).json({ status: 'success', message: "success", docs: expense });
          }
        })
      }
    })
  },
  calculateExpense: function (req, res) {

    tripModel.findOne({ _id: req.body.tripId })
      .populate('expense').populate('person')
      .exec(function (err, trip) {
        if (err) {
          res.status(500).json({ status: 'error', message: 'error in getting expenseType', docs: err });
          console.log('err');
        }
        else {
          for (i = 0; i < trip.expense.length; i++) {
            if (trip.expense[i].expenseType == 'personal') {
              console.log('inside personal')
              for (j = 0; j < trip.person.length; j++) {
                if (trip.expense[i].shared_by[j].personId == (trip.person[j]._id).toString()) {
                  console.log('person spent money' + trip.expense[i].shared_by[j].spent);
                  trip.person[j].personalDetails.depositAmountGiven = trip.person[j].deposit;
                  trip.person[j].personalDetails.depositAmountRemaining = trip.person[j].deposit - trip.person[j].personalDetails.depositAmountSpent;
                  trip.person[j].personalDetails.personalAmount += trip.expense[i].paid_by[j].paidAmount;
                  trip.person[j].personalDetails.personalAmountSpent += trip.expense[i].shared_by[j].spent;
                  trip.person[j].personalDetails.totalAmount = trip.person[j].deposit + trip.person[j].personalDetails.personalAmount;
                  trip.person[j].personalDetails.totalAmountSpent = trip.person[j].personalDetails.personalAmountSpent + trip.person[j].personalDetails.depositAmountSpent;
                  trip.person[j].personalDetails.totalAmountRefundDue = trip.person[j].personalDetails.totalAmount - trip.person[j].personalDetails.totalAmountSpent;
                }
              }
            }
            else if (trip.expense[i].expenseType == 'deposit') {
              console.log('inside deposit')
              for (j = 0; j < trip.person.length; j++) {
                if (trip.expense[i].shared_by[j].personId == (trip.person[j]._id).toString()) {
                  console.log('person spent money' + trip.expense[i].shared_by[j].spent);
                  trip.person[j].personalDetails.depositAmountGiven = trip.person[j].deposit;
                  trip.person[j].personalDetails.depositAmountSpent += trip.expense[i].shared_by[j].spent;
                  trip.person[j].personalDetails.depositAmountRemaining = trip.person[j].deposit - trip.person[j].personalDetails.depositAmountSpent;
                  trip.person[j].personalDetails.totalAmount = trip.person[j].deposit + trip.person[j].personalDetails.personalAmount;
                  trip.person[j].personalDetails.totalAmountSpent = trip.person[j].personalDetails.personalAmountSpent + trip.person[j].personalDetails.depositAmountSpent;
                  trip.person[j].personalDetails.totalAmountRefundDue = trip.person[j].personalDetails.totalAmount - trip.person[j].personalDetails.totalAmountSpent;
                }
              }
            }
          }

          console.log("trip")
          res.send(trip.person);
        }
      })
  },
  //expenseId
  delete: function (req, res) {
    console.log(req.body);
    expenseModel.findByIdAndRemove(req.body.expenseId, function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        console.log(data._trip);
        tripModel.findOne({ _id: data._trip }, function (err, docs) {
          var i = docs.expense.indexOf(req.body.expenseId);
          docs.expense.splice(i, 1);
          docs.save(function (err, doc) {
            if (err) console.log(err);
            else {
              res.send(doc);
            }
          })
        })
      }
    })
  },
  //populate expense by expenseType
  populate: function (req, res) {
    tripModel.findOne({ _id: req.body._id })
      .populate('expense')
      .exec(function (err, trip) {
        if (err) {
          res.status(500).json({ status: 'error', message: 'error in getting expenseType', docs: err });
          console.log('err');
        }
        else {
          console.log(trip.expense.length);
          depositAmt = 0;
          personalAmt = 0;
          // for (i = 0; i < trip.expense.length; i++) {
          // }
          expenseModel.aggregate([
            { $match: {
                expenseType: 'personal'
            }}
        ], function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
        });
        expenseModel.aggregate([
          { $match: {
              expenseType: 'deposit'
          }}
      ], function (err, result) {
          if (err) {
              console.log(err);
              return;
          }
          console.log(result);
      });
        //*** */
          for (i = 0; i < trip.expense.length; i++) {
            console.log(trip.expense[i].expenseType);
            if (trip.expense[i].expenseType == "Deposit") {
              depositAmt += trip.expense[i].expenseAmount;
            }
            if(trip.expense[i].expenseType == "personal") {
              personalAmt += trip.expense[i].expenseAmount;
            }
          }
          console.log('pesonal ' + personalAmt + '\n' + 'deposit ' + depositAmt)
          res.status(200).json({ status: 'success', message: 'success expenseType', docs: trip.expense });
        }
      })
  },

}
module.exports = expenses;

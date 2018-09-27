var express = require('express');
var router = express.Router();
var expense=require('./controllers/expense');
var trips = require('./controllers/trip.js');
var expenseType=require('./controllers/expenseType');
var person=require('./controllers/person')

//creating Trip as well Persons
router.post('/api/trip/create', trips.create);
router.post('/api/trip/getTripByCode', trips.getOnebyCode);
router.post('/api/trips/', trips.getAll);
router.delete('/api/trip/:id', trips.delete);

//getTripdata
router.post('/api/trip/getTrip', trips.getOne);
router.post('/api/trip/getPerson', trips.getPerson);

//creating Expense/deleting/updation
router.post('/api/expense/create',expense.create);
router.post('/api/expense/delete',expense.delete);
//router.post('/api/expense/update);

//calculate Expense per person
router.post('/api/expense/calculateExpense',expense.calculateExpense);

//calculate Expense for deposit/personal
router.post('/api/trip/totalExp',expense.populate);


// router.post('api/trip/typeExpense',expense.populateType);

//create person/deleting/updation
router.post('/api/person/create',person.create);
router.post('/api/person/delete',person.delete);
// router.post('api/person/update');

//create APIs for by_date/by_user/for_user/total(by_type);
//expense type
router.post('/api/expense/expenseType',expenseType.create);
router.get('/api/expense/expenseType',expenseType.getTypes);
router.post('/api/expense/getType',expenseType.populate);

module.exports = router;
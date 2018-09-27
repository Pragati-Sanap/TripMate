var tripModel = require('../models/trip');
var randomstring = require("randomstring");
var personModel = require('../models/person');
personData: [];
var trips = {

    create: function (req, res) {
        var trip = new tripModel();
        trip.tripDate = req.body.tripDate;
        trip.tripName = req.body.tripName;
        trip.userEmail = req.body.userEmail;
        trip.places = req.body.places;
        trip.tripCode = randomstring.generate(6);
        personData = req.body.person;
        console.log(personData);
        personModel.insertMany(personData).then(response => {
            console.log('/updateSchema');
            console.log(response.length);
            for (i = 0; i < response.length; i++) {
                trip.person.push(response[i]._id);
            }
            console.log('person added')
            console.log(trip.person);   
            console.log(' Trip Data got loaded');
            console.log(trip.person);

            trip.save(function (err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: err, docs: '' });
                }
                else {
                    console.log(doc);
                    res.status(200).json({ status: 'success', message: 'Document Created Successfully', docs: doc });
                }
            })         
        }).catch(err => {
            console.log(err);
            res.status(400).send('Failed to insert');
        });
            
    },
    //"userEmail":"test@gmail.com"
    getAll: function (req, res) {
        console.log(req.body)
        tripModel.find({ userEmail: req.body.userEmail }, function (err, doc) {
            console.log(doc)
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'errror', message: 'Database error' + err, docs: doc });
            }
            else {
                console.log(doc)
                res.status(200).json({ status: 'success', message: 'success', docs: doc });
            }
        });
    },
    //"userEmail":"test@gmail.com",
    // "tripId":1
    getOne: function (req, res) {
        tripModel.findOne({ tripId: req.body.tripId }, function (err, doc) {
            if (err || doc.tripId != req.body.tripId) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: "" });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success', doc: doc });
            }
        });
    },
    getOnebyCode: function (req, res) {
        tripModel.findOne({ tripCode: req.body.tripCode }, function (err, doc) {
            console.log(doc)
            if (err || doc.tripCode != req.body.tripCode) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: "" });
            }
            else {
                var trip = new tripModel();
                trip.tripName = doc.tripName;
                trip.userEmail = req.body.userEmail;
                trip.places = doc.places;
                trip.tripDate = doc.tripDate;
                trip.person = doc.person;
                trip.tripCode = req.body.tripCode;
                trip.group = req.body.group;
                trip.save(function (err, doc) {
                    if (err)
                        res.status(500).json({ status: 'error', message: 'Database error' + err, docs: "" });
                    else {
                        res.status(200).json({ status: 'success', message: 'success', doc: doc });
                    }
                })
            }
        });
    },
    delete: function (req, res) {
        tripModel.findByIdAndRemove({ _id: req.params.id }).exec((err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: "" });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success', doc: doc });
            }
            // Do stuff
        });
    },
    getPerson: function (req, res) {
        tripModel.findOne({ _id: req.body._id })
            .populate('person')
            .exec(function (err, trip) {
              if(err){
                console.log('err in getting person')
              }  
              else{
                  console.log("trip with person data");
                  console.log(trip.person[0]);
              }
            })
        // tripModel.findOne({ tripCode: req.body.tripCode, userEmail: req.body.userEmail }, function (err, doc) {
        //     if (err) {
        //         res.status(500).json({ status: 'error', message: 'Database error' + err, docs: "" });
        //     }
        //     else {
        //         res.status(200).json({ status: 'success', message: 'success', doc: doc.person });
        //     }
        // });
    },
    updatePerson: function (req, res) {
        tripModel.findOne(req.params.id, function (err, doc) {
            if (err)
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            doc.person = req.body.person;
            doc.save(function (err) {
                if (err) {
                    res.status(504).json({ status: 'error', message: 'database error' + err, docs: doc });
                }
                else {
                    res.status(200).json({ status: 'success', message: 'Document Updated Successfully', docs: doc });
                }
            });

        });
    }

}

module.exports = trips;
/**
 * Todo.findByIdAndUpdate(
    // the id of the item to find
    req.params.todoId,
    
    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,
    
    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},
    
    // the callback function
    (err, todo) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(todo);
    }
)


/**
      trip.group.depositAmtRecieved = 0;
        trip.group.depositAmtRemaining = 0;
        for (i = 0; i < noOfPerson; i++) {
            person = {
                name: req.body.person[i].name,
                Mobile: req.body.person[i].Mobile,
                email: req.body.person[i].email,
                deposit: req.body.person[i].deposit,
                personalDetails: {
                    depositAmountGiven: req.body.person[i].deposit,
                    depositAmountRemaining: req.body.person[i].deposit,
                    totalAmount: req.body.person[i].deposit,
                    totalAmountRefundDue: req.body.person[i].deposit
                }
            }
            trip.group.depositAmtRecieved += req.body.person[i].deposit;
            trip.group.depositAmtRemaining += req.body.person[i].deposit;
            trip.person.push(person);
        }
      

 */
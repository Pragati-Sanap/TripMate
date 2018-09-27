var person = require('../models/person');
var trip = require('../models/trip');

var person = {
create: function (req, res) {
        var p = new person();
        p.name = req.body.person[i].name;
        p.mobile = req.body.person[i].mobile;
        p.email = req.body.person[i].email;
        p.deposit = req.body.person[i].deposit;
        p.save(function (err, docs) {
            if (err) {
                console.log("err" + '\n' + err);
                res.status(200).json({ status: 'success', message: "success", docs: docs });
            }
            else {
                res.status(200).json({ status: 'success', message: "success", docs: docs });
            }
        })
    },
    //tripId
  //personId
    delete:function(req,res){
        person.findOne({ _id: req.body._id }).exec((err, docs) => {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: "" });
            }
            else {
                
                res.status(200).json({ status: 'success', message: 'success', doc: doc });
            }
            // Do stuff
        });
    }
}
module.exports = person;
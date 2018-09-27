//packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//file includes
var config = require('./config/config');

/********Start App***********/
var app = express();

//parse json
app.use(bodyParser.json());

app.all('/*',function(req,res,next){
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,**Authorization**');
    if(res.method == 'OPTIONS') {
        res.status(200).end();
    }else{
        next();
    }
});

app.use('/',require('./routes'));

//if no route is matched by now ,it must be 404
app.use(function(req,res,next){
    res.status(404).json({status:"page not found"}).end();
});

/*************End app intialization**********/

/****start server & DB****/
app.set('port',config.port);
var server = app.listen(app.get('port'),function(){
    console.log('Express server listening on port '+server.address().port);
});

//database connection
mongoose.connect(config.mongo.url,{ useNewUrlParser: true },function(err,database){
    if(err){
        console.log(err);
        process.exit(1);
    }
        
//save database object from callback for reuse
    db=database;
    console.log('Database connection ready..');
});
 

/***end server and DB connection*******/



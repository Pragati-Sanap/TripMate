var config={
    port:2100,
     mongo:{
        hostname: 'localhost',
        port: '27017',
        db: 'tripmate'
    }
};
config.mongo.url= 'mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;

module.exports=config;
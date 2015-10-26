module.exports = function(app, passport) {
    var multer = require('multer');
    var fs = require('fs');
    var path = require('path');

    //respond to CORS first request
    app.options('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-sqeed-token");
        res.send();
    });
    //allow CORS second request
    app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    // basic route
    app.get('/', function(req, res) {
        res.send('Hello! The API is at http://localhost:' + port + '/api');
    });


    app.get('/api/offers/admin', function(req, res){
        res.sendfile(path.resolve('views/offer.html'));
    });


    process.on('uncaughtException', function(err) {
        console.log(err);
    });
}


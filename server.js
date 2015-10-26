// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var straightFlush = require("./rules/StraightFlush.js");
var pair = require("./rules/Pair.js");
var royalFlush = require("./rules/RoyalFlush.js");
var twoPair = require("./rules/twoPair.js");
var threeOfAKind = require("./rules/threeOfAKind.js");


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here


//Here you put all your rules
router.use(straightFlush.StraightFlushRule);


router.use(royalFlush.RoyalFlushRule);
router.use(threeOfAKind.threeOfAKindRule);
router.use(twoPair.twoPairRule);
router.use(pair.pairRule);


// ----------------------------------------------------
router.route('/hands')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

    	res.json({result: 'You have nothing'});
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
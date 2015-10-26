// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var PROVIDER = require('../app/models/provider.js');


//load json web token lib
var jwt = require('jsonwebtoken');

// expose this function to our app using module.exports
module.exports = function(app, providerPassport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    providerPassport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    providerPassport.deserializeUser(function(id, done) {
        PROVIDER.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
	providerPassport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

	        // find a user whose email is the same as the forms email
	        // we are checking to see if the user trying to login already exists
	        PROVIDER.findOne({ 'email' :  email }, function(err, provider) {
	            // if there are any errors, return the error
	            if (err){
                    return done('Error: ' + err);
                }

	            // check to see if theres already a user with that email
	            if (provider) {
	                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
	            } else {

	                // if there is no user with that email
	                // create the user
	                var newProvider = new PROVIDER();

	                // set the user's local credentials
	                newProvider.email = req.body.email;
	                newProvider.password = newProvider.generateHash(req.body.password);
	                newProvider.address = req.body.address;
                    newProvider.name = req.body.name;
                    newProvider.postal_code = req.body.postal_code;
                    newProvider.phone = req.body.phone;
                    newProvider.facebook_url = req.body.facebook_url;
                    newProvider.instagram_url = req.body.instagram_url;
                    newProvider.web_site_url = req.body.web_site_url;
                    newProvider.facebook_url = req.body.facebook_url;
                    newProvider.token = jwt.sign(newProvider, app.get('providerTokenSecret'));

	                // save the user
	                newProvider.save(function(err) {
	                    if (err){
                            throw err;
                        }   
	                    return done(null, newProvider);
	                });
	            }

	        });    

        });

    }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    providerPassport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists



        PROVIDER.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done('Error: ' + err);
            }

            // if no user is found, return the message 
            if (!provider){
                return done(null, false, req.flash('loginMessage', 'No provider found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!provider.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
        
            // all is well, return successful user
            // save the user
            provider.save(function(err) {
                if (err){
                    throw err;
                }   
                return done(null, provider);
            });
        });
    }));

}
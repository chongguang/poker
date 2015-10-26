// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var USER = require('../app/models/user.js');

// load the auth variables
var configAuth = require('./auth');

//load json web token lib
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

// expose this function to our app using module.exports
module.exports = function(app, passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        USER.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
	passport.use('local-signup', new LocalStrategy({
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
	        USER.findOne({ 'email' :  email }, function(err, user) {
	            // if there are any errors, return the error
	            if (err){
                    return done('Error: ' + err);
                }

	            // check to see if theres already a user with that email
	            if (user) {
	                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
	            } else {

	                // if there is no user with that email
	                // create the user
	                var newUser = new USER();

	                // set the user's local credentials
	                newUser.email = req.body.email;
	                newUser.password = newUser.generateHash(req.body.password);
	                newUser.name = req.body.name;
                    newUser.forename = req.body.forename;
                    newUser.phone_number = req.body.phone_number;
                    if(req.body.gcm_token){
                        newUser.gcm_token = [req.body.gcm_token];
                    }
                    newUser.token = jwt.sign(newUser, app.get('superSecret'));
                    newUser.going = [];
                    newUser.waiting = [];
                    newUser.spam = [];
                    newUser.done = [];
                    newUser.friends = [];
                    newUser.friends.push(mongoose.Types.ObjectId(app.get('superAdminID')));
                    newUser.blocking = [];
                    newUser.blocked = [];
                    newUser.requesting = [];
                    newUser.requested = [];

	                // save the user
	                newUser.save(function(err) {
	                    if (err){
                            throw err;
                        }   
	                    return done(null, newUser);
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

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists



        USER.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done('Error: ' + err);
            }

            // if no user is found, return the message 
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
        
            // all is well, return successful user

            if(req.body.gcm_token){
                user.gcm_token.push(req.body.gcm_token);
            }
            // save the user
            user.save(function(err) {
                if (err){
                    throw err;
                }   
                return done(null, user);
            });
        });
    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)


    },

    // facebook will send back the token and profile
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {

                // find the user in the database based on their facebook id
                USER.findOne({ 'account.facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err){
                        return done(err);
                    }

                    // if the user is found, then log them in
                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.account.facebook.token) {
                            user.account.facebook.token = token;
                            user.account.facebook.name  = profile.name.givenName; 
                            user.account.facebook.forename  = profile.name.familyName; 
                            user.account.facebook.email = profile.emails[0].value; 

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new USER();

                        // set all of the facebook information in our user model
                        newUser.account.facebook.id = profile.id; // set the users facebook id                   
                        newUser.account.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.account.facebook.name  = profile.name.givenName; // look at the passport user profile to see how names are returned
                        newUser.account.facebook.forename  = profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.account.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err){
                                throw err;
                            }

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user  = req.user; // pull the user out of the session

                // update the current users facebook credentials
                user.account.facebook.id = profile.id;
                user.account.facebook.token = token;
                user.account.facebook.name  = profile.name.givenName; 
                user.account.facebook.forename  = profile.name.familyName; 
                user.account.facebook.email = profile.emails[0].value; 


                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));

}
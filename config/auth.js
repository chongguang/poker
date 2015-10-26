module.exports = {

    'facebookAuth' : {
        'clientID'      : '1449891515331608', // your App ID
        'clientSecret'  : '9b1534fa00079b8aae917a58c25aa36e', // your App Secret
        'callbackURL'   : 'http://localhost:8080/api/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/api/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/api/auth/google/callback'
    }

};
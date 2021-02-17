const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

//create a cookie by encrypting with a piece of user info like mongodb id
passport.serializeUser((user, done) => {
    done(null, user.id); //if there is an error, you can pass it in through null- user.id will go into cookie to be sent to browser
});

//receive cookie, get id, check which user it belongs to
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user); // pass user to next stage
        });
});

passport.use(
    //options for the google strategy
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exists in our db
        console.log('**********passport-setup-profile is:', profile);
        User.findOne({
                googleId: profile.id
            })
            .then((currentUser) => {
                if (currentUser) { //already have the user
                    console.log('******passport-setup.js currentUser is: ', currentUser);
                    done(null, currentUser);
                } else { //if not, create user in our db
                    new User({
                            username: profile.displayName,
                            googleId: profile.id
                        }).save()
                        .then((newUser) => {
                            console.log('************passport-setup.js new user is: ' + newUser);
                            done(null, newUser);
                        });
                }
            });
    }));

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const User = require('../models/User');
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const User = require('../models/User');
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    tokens: [{ accessToken, refreshToken, provider: 'google' }]
                });
            } else {
                user.googleId = profile.id;
                user.tokens.push({ accessToken, refreshToken, provider: 'google' });
            }
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/github/callback',
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    const User = require('../models/User');
    try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new User({
                    githubId: profile.id,
                    email: profile.emails[0].value,
                    tokens: [{ accessToken, refreshToken, provider: 'github' }]
                });
            } else {
                user.githubId = profile.id;
                user.tokens.push({ accessToken, refreshToken, provider: 'github' });
            }
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));
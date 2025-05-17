const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    tokens: [{
        accessToken: { type: String },
        refreshToken: { type: String },
        provider: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
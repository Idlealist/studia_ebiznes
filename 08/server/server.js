const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('./config/passport');

const User = require('./models/User');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    });
};

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });
        await user.save();

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        const token = generateToken(req.user);
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);

app.get('/api/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/api/auth/github/callback',
    passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        const token = generateToken(req.user);
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);

app.get('/api/user', authenticateToken, (req, res) => {
    res.json({ email: req.user.email });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running port ${PORT}`));
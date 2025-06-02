const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', // fallback for local dev
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // set to true only in production with HTTPS
}));

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile); // Save to DB here if needed
}));

passport.serializeUser((user, done) => {
  done(null, user); // You can serialize a user ID instead
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// ✅ Google OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // Send to React frontend
  }
);

// ✅ Profile route for frontend after login
app.get('/api/users/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// ✅ Logout
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// ✅ API Routes
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dealsRoutes = require('./routes/dealsRoutes');
const taskRoutes = require('./routes/taskRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

// ✅ Mount Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// ✅ Home
app.get('/', (req, res) => {
  res.send('Xeno CRM Backend is running 🚀');
});

// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

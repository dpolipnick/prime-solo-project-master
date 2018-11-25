// Vendors 1
const express = require('express');
require('dotenv').config();

// Vendors 2
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

/* ======================= REQUIRE ROUTES ======================= */
const userRouter = require('./routes/user.router');
const categoriesRouter = require('./routes/categories.router');
const habitsRouter = require('./routes/habits.router');
const occurrencesRouter = require('./routes/occurrences.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* ======================= ROUTES ======================= */
app.use('/api/user', userRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/occurrences', occurrencesRouter);

// Serve static files
app.use(express.static('build'));

// App Set
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

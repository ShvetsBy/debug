const express = require('express');
const db = require('./db');
const user = require('./controllers/usercontroller');
const validator = require('./middleware/validate-session');
const game = require('./controllers/gamecontroller');
require('dotenv').config();
const PORT = process.env.LOCALHOST_PORT;

const app = express();
db.sync();
app.use(require('body-parser').json());
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

app.use('/api/auth', user);
app.use(validator);
app.use('/api/game', game);

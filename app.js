require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routers/indexRouter');
const checkSession = require('./middlewares/checkSession');


const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

const sessionConfig = {
  name: 'auth',
  secret: 'catdog',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // COOKIE'S LIFETIME — 1 DAY
  },
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(cookieParser());

app.use(checkSession);

app.use('/', indexRouter);

app.listen(PORT, () => console.log('Server work, but you not', PORT));

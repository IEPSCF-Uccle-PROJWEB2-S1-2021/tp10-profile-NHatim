const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {check, validationResult} = require('express-validator');
const session = require('express-session');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(session({
  secret : 'yourSecret',
  resave : false,
  saveUninitialized : false,
  }));


app.post('/register',
[
  check('nom').trim().isLength({ min: 3 }).escape(),
  check('prenom').trim().isLength({ min: 3 }).escape(),
  check('zipcode').trim().isLength({min : 4}).escape()
],

(req,res,next) =>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400));
  } else {

    req.session.nom = req.body.nom;
    req.session.prenom = req.body.prenom;
    req.session.zipcode = req.body.zipcode
    console.log(req.session);
    res.render('logged', { title: 'Login', nom : req.session.nom, prenom : req.session.prenom, zipcode : req.session.zipcode });
  }

})

app.post('/logout', (req, res, next) =>{
  res.render('index', {title : req.session.nom, phrase : 'Au revoir'});
  req.session.destroy();
})



app.get('/register', (req,res) =>{

    res.render('register', { title: 'Enregistrement' });

})





// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});





// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);
  res.render('error', { title: `Error ${status}` });
});

module.exports = app,session;

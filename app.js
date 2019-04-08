const express = require('express');
//const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const compositepages = require('./routes/composite');

const app = express();
app.disable('x-powered');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors());


// register ite-wide routes
app.use('/', indexRouter);
app.use('/advisors', compositepages);
app.use('/blockchain-and-iot', compositepages);
app.use('/blockchain-rewards', compositepages);
app.use('/company', compositepages);
app.use('/digital-id', compositepages);
app.use('/fan-engagement', compositepages);
app.use('/frictionless-payment', compositepages);
app.use('/games', compositepages);
app.use('/insights', compositepages);
app.use('/join-the-team', compositepages);
app.use('/interorganization', compositepages);
app.use('/learn', compositepages);
app.use('/loyalty-and-rewards', compositepages);
app.use('/media-center', compositepages);
app.use('/roster', compositepages);
app.use('/road-map', compositepages);
app.use('/smart-ticketing', compositepages);
app.use('/overview', compositepages);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.sendFile('error.html');
});

module.exports = app;
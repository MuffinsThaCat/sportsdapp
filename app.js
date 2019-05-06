'use strict';
// dependencies an modules
const createError = require('http-errors');
const express = require('express');
const ehbs = require('express-handlebars');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose').Schema;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./routes/resources/models/db');



// site-wide routes
const indexRouter = require('./routes/index');
const advisorsRouter = require('./routes/about/advisors');
const companyRouter = require('./routes/about/company');
const joinRouter = require('./routes/about/joinTheteam');
const rosterRouter = require('./routes/about/roster');

const insightsRouter = require('./routes/resources/insights');
const learnRouter = require('./routes/resources/learn');
const mediaRouter = require('./routes/resources/media');

const fanEngagementRouter = require('./routes/sportsDapp/fanEngagement');
const gamesRouter = require('./routes/sportsDapp/games');
const loyaltyRouter = require('./routes/sportsDapp/loyaltyAndrewards');
const roadmapRouter = require('./routes/sportsDapp/roadmap');
const smartTicketing = require('./routes/sportsDapp/smartTicketing');

const blockchainAndIotRouter = require('./routes/use_cases/blockchainAndIot');
const blockchainRewardsRouter = require('./routes/use_cases/blockchainRewards');
const digitalIdRouter = require('./routes/use_cases/digitalId');
const fricitionlessPaymentRouter = require('./routes/use_cases/frictionlessPayment');
const interOrganizationRouter = require('./routes/use_cases/interorganizationDatamgt');
const overview = require('./routes/use_cases/overview');


const app = express();


app.disable('x-powered-by');

app.engine('.hbs', ehbs({
    extname: '.hbs',
}));


app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views/partials'));

app.use(helmet());
app.use(logger('dev'));

// enable cross site origin
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// register routes
app.use('/', indexRouter);
app.use('/advisors', advisorsRouter);
app.use('/blockchain-and-iot', blockchainAndIotRouter);
app.use('/blockchain-rewards', blockchainRewardsRouter);
app.use('/company', companyRouter);
app.use('/digital-id', digitalIdRouter);
app.use('/fan-engagement', fanEngagementRouter);
app.use('/frictionless-payments', fricitionlessPaymentRouter);
app.use('/gamers', gamesRouter);
app.use('/insights', insightsRouter);
app.use('/join-the-team', joinRouter);
app.use('/interorganization-data-management', interOrganizationRouter);
app.use('/learn', learnRouter);
app.use('/loyalty-and-rewards', loyaltyRouter);
app.use('/media-center', mediaRouter);
app.use('/roster', rosterRouter);
app.use('/road-map', roadmapRouter);
app.use('/smart-ticketing', smartTicketing);
app.use('/overview', overview);

// let,s connect to mongodb
const opts = {
    server: {
        socketOptions: {
            keepAlive: 1
        }

    }
};

const BlogPostSchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    body: { type: String, required: true },
    teaser: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    published: { type: Boolean, required: true, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    // collection
    collection: 'feeds',
});

// update timestamps on save
BlogPostSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    if (this.isNew) this.createdAt = this.updatedAt;

});

switch (app.get('env')) {
    case 'development':
        mongoose.connect(db.development.string,
            opts.server.scocketOPtions,
            opts.useNewUrlParser);

        break;
    case 'production':
        mongoose.connect(db.production.string,
            opts.server.scocketOPtions,
            opts.useNewUrlParser);

        break;
    default:
        throw new Error('unknown execution environment' + app.get('env'));

}
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
    res.render('error', {
        layout: false,
    });
});

module.exports = app;
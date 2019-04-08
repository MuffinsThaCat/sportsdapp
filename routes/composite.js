const express = require('express');
const router = express.Router();

/* GET users listing. */



/* GET advisors page. */
router.get('/advisors', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GETblockchain and iot. */
router.get('/blockchain-and-iot', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET copany page. */
router.get('/company', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET contact page. */
router.get('/contact', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET digital id page. */
router.get('/digital-id', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET Fan Page. */
router.get('/fan-engagement', function(req, res, next) {
    res.sendFile('./views/index.html');
});

/* GET frictionless-payments. */
router.get('/frictionless-payments', function(req, res, next) {
    res.sendFile('./views/index.html');
});

/* GET games. */
router.get('/games', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET learn. */
router.get('/learn', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET insights page. */
router.get('/insights', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET interorganization page. */
router.get('/inter-organization-data-management', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET loyalty and rewards page. */
router.get('/loyalty-and-rewards', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET media center page. */

router.get('/media-center', function(req, res, next) {
    res.sendFile('./views/index.html');
});


/* GET overview. */

router.get('/overview', function(req, res, next) {
    res.sendFile('./views/index.html');
});

/* GET roadmap. */
router.get('/road-map', function(req, res, next) {
    res.sendFile('./views/index.html');
});



/* GET roster. */
router.get('/roster', function(req, res, next) {
    res.sendFile('./views/index.html');
});

/* GET smart-ticketing. */
router.get('/smart-ticketing', function(req, res, next) {
    res.sendFile('./views/index.html');
});

// GET the whitepaper
router.get('/whitepaper', function(req, res, next) {
    res.sendFile('./views/index.html');
});



module.exports = router;
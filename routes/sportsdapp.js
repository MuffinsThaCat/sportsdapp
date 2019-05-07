const express = require('express');
const path = require('path');
const router = express.Router();





/* GET advisors page. */
router.get('/advisors', function(req, res, ) {
  res.sendFile(path.join(__dirname, 'views', 'advisors.html'));
});


/* GETblockchain and iot. */
router.get('/blockchain-and-iot', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'blockchain-and-iot.html'));
});


/* GET copany page. */
router.get('/company', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'company.html'));
});


/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});


/* GET digital id page. */
router.get('/digital-id', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'digital-id'));
});


/* GET Fan Page. */
router.get('/fan-engagement', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'fan-engagement.html'));
});

/* GET frictionless-payments. */
router.get('/frictionless-payments', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'frictionless-payment.html'));
});

/* GET games. */
router.get('/games', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'games.html'));
});


/* GET learn. */
router.get('/learn', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'learn.html'));
});


/* GET insights page. */
router.get('/insights', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'insights.html'));
});


/* GET interorganization page. */
router.get('/inter-organization-data-management', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'interorganization-data-management.html'));
});


/* GET loyalty and rewards page. */
router.get('/loyalty-and-rewards', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'loyalty-and-rewards.html'));
});

/* GET loyalty and rewards page. */
router.get('/join-the-team', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'joint-the-team.html'));
});


/* GET media center page. */

router.get('/media-center', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'media.html'));
});


/* GET overview. */

router.get('/overview', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'overview.html'));
});

/* GET roadmap. */
router.get('/road-map', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'road-map.html'));
});



/* GET roster. */
router.get('/roster', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'roster.html'));
});

/* GET smart-ticketing. */
router.get('/smart-ticketing', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'smart-ticketing.html'));
});

// GET the whitepaper
router.get('/whitepaper', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'whitepaper.html'));
});



module.exports = router;
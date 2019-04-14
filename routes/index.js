const express = require('express');
const path = require('path');
const router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index.hbs', {
        layout: false
    });
});

router.get('/contact', function(req, res, next) {
    res.render('contact.hbs', {
        layout: false
    });
});




module.exports = router;
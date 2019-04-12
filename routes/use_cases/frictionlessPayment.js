const express = require('express');
const path = require('path');
const router = express.Router();

/* GET frictionless-payments page. */
router.get('/', function(req, res, next) {
    res.render('frictionless-payments.hbs', {
        layout: false
    });
});



module.exports = router;
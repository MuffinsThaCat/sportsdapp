const express = require('express');
const path = require('path');
const router = express.Router();

/* GET copany page. */
router.get('/', function(req, res, next) {
    res.render('join-the-team.hbs', {
        layout: false
    });
});



module.exports = router;
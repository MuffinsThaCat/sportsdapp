const express = require('express');
const router = express.Router();

/* GET copany page. */
router.get('/', function(req, res, next) {
    res.render('learn.hbs', {
        layout: false,
    });
});

module.exports = router;
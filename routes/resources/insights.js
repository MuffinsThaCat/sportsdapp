const express = require('express');
const path = require('path');
const router = express.Router();

/* GET insights page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('views/insights.html'));
});

module.exports = router;
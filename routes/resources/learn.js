const express = require('express');
const path = require('path');
const router = express.Router();





/* GET advisors page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('views/learn.html'));
});

module.exports = router;


module.exports = router;
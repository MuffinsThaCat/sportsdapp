const express = require('express');
const path = require('path');
const router = express.Router();





/* GET advisors page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('views/advisors.html'));
});

module.exports = router;
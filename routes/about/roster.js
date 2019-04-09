const express = require('express');
const path = require('path');
const router = express.Router();
/* GET roster. */
router.get('/roster', function(req, res, next) {
    res.sendFile(path.resolve('views/roster.html'));
});


module.exports = router;
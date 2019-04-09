const express = require('express');
const path = require('path');
const router = express.Router();

/* GET copany page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('views/loyalty-and-rewards.html'));
});



module.exports = router;
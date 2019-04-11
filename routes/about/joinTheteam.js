const express = require('express');
const path = require('path');
const router = express.Router();
/* GET join the team. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('views/join-the-team.html'));
});

module.exports = router;
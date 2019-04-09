const express = require('express');
const path = require('path');
const router = express.Router();
/* GET join the team. */
router.get('/join-the-team', function(req, res, next) {
    res.sendFile(path.resolve('views/joint-the-team.html'));
});

module.exports = router;
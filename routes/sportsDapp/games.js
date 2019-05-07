const express = require('express');
const path = require('path');
const router = express.Router();

/* GET Games Page page. */
router.get('/', function(req, res, next) {
  res.render('gamers.hbs', {
    layout: false
  });
});



module.exports = router;
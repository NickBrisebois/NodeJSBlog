const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  res.render('secret', { loggedIn: true });
});

module.exports = router;

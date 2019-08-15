const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

let rest= require('../actions/REST');

/* GET control panel page. */
router.get('/', function(req, res, next) {
	let token = req.cookies['auth-token'];
	rest.isLoggedIn(token).then( (loggedIn) => {
		if(loggedIn) {
			res.render('controlpanel');
		}else {
			res.sendStatus(403);
		}
	});
});

module.exports = router;
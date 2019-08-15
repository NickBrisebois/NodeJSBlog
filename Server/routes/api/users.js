const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/register', auth.optional, (req, res, next) => {
	const {body: {user}} = req;

	if(!user.username) {
		return res.status(422).json({
			errors: {
				username: 'is required',
			}
		});
	}

	if(!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			}
		});
	}

	const finalUser = new Users(user);

	finalUser.setPassword(user.password);

	return finalUser.save()
	.then( () => res.json({user: finalUser.toAuthJSON()}));

})

router.post('/login', auth.optional, (req, res, next) => {
	const {body: {user}} = req;

	if(!user.username) {
		return res.status(422).json({
			errors: {
				username: 'is required'
			}
		});
	}
	
	if(!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required'
			}
		});
	}

	return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
		if(err) return next(err);

		if(passportUser) {
			const user = passportUser;
			user.token = passportUser.generateJWT();
			res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
			res.set('Access-Control-Allow-Headers', 'content-type, allow');
			res.set('Access-Control-Allow-Credentials', 'true');
			res.cookie('auth-token', user.token, {httpOnly: true, maxAge: 90000});
			res.sendStatus(200);
			next();
		}
		return res.status(400);
	})(req, res, next);
});

/**
 * Check log in state of user
 */
router.post('/isLoggedIn', (req, res, next) => {
	if(req.body['auth-token'] != undefined) {
		let user = jwt.decode(req.body['auth-token']);
		console.log(user);
		Users.findById(user['id']).then((user) => {
			if(user != undefined) {
				return res.json({'validLogin': true});
			}else {
				return res.json({'validLogin': false});
			}
		});
	}else {
		return res.sendStatus(401);
	}
})

module.exports = router;
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const apiUrl = "http://localhost:8000/api";

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('secret', { loggedIn: isLoggedIn(req.cookies['auth-token']) });
});

/**
 * REST call to server to check if client is logged in 
 * @param {string} token 
 */
function isLoggedIn(token) {
	console.log(token);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		credentials: 'include',
		body: JSON.stringify({'auth-token': token}),
	};

	return new Promise((resolve) => {
		fetch(`${apiUrl}/users/isLoggedIn`, options).then(res => {
			if(res.ok) {
				res.json().then((data) => {
					console.log('Logged in: ' + data['validLogin']);
					return data['validLogin'];
				});
			}else {
			}
		}).catch(e => console.log(e));
	})
}

module.exports = router;

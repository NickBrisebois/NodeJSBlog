const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const apiUrl = "http://localhost:8000/api";

/**
 * REST call to server to check if client is logged in 
 * @param {string} token 
 */
module.exports.isLoggedIn = function (token) {
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
					resolve(data['validLogin']);
				});
			}
		}).catch(e => console.log(e));
	})
}
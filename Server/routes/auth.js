
const jwt = require('express-jwt');

const getTokenFromCookie = (req) => {
    let token = 0;
    if(req && req.cookies) {
        token = req.cookies['auth-token'];
    }
    return token;
}

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromCookie
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromCookie,
        credentialsRequired: false
    })
};

module.exports = auth;
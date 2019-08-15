
const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    return req.cookies['auth-token'];
}

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    })
};

module.exports = auth;
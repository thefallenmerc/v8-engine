'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Authenticate middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function OptionalAuthMiddleware(req, res, next) {
    // get the authorization header
    const { authorization } = req.headers;

    if (authorization) {
        // get token from header
        const [, token] = authorization.split(" ");

        // try decoding the token
        try {
            const userData = await jwt.verify(token, process.env.APP_KEY);
            const user = await User.findById(userData.id);

            // if cannot find user return unauthenticated
            if (user) {
                // add user to request
                req.user = user;
                req.authToken = token;
            }
        } catch (error) {
            // do nothing here
        }
    }

    // perform next request anyways
    return next();
}

module.exports = OptionalAuthMiddleware;
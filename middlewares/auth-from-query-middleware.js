'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Authenticate middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function AuthFromQueryMiddleware(req, res, next) {
    // get the authorization header
    const { token } = req.query;

    // if not available return failure response
    if (!token) {
        return res.status(401).json({
            "message": "Unauthenticated!"
        });
    }

    // try decoding the token
    try {
        const userData = await jwt.verify(token, process.env.APP_KEY);
        const user = await User.findById(userData.id);

        // if cannot find user return unauthenticated
        if (!user) {
            return res.status(401).json({
                "message": "Unauthenticated!"
            });
        }

        // add user to request
        req.user = user;

        // perform next request
        return next();
    } catch (error) {
        // return unauthenticated
        return res.status(401).json({
            "message": "Unauthenticated!"
        });
    }
}

module.exports = AuthFromQueryMiddleware;
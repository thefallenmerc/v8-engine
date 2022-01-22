'use strict';

/**
 * Socket middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function SocketMiddleware(io = null) {
    return (req, res, next) => {
        // add io to req
        req.io = io;
        // pass to next middleware
        next();
    }
}

module.exports = SocketMiddleware;
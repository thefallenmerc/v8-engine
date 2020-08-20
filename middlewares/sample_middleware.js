'use strict';

module.exports = function(req, res, next) {
    // Do your thing
    console.log("Sample Middleware used!");
    return next();
}
const express = require('express');
const SocketMiddleware = require('../middlewares/socket-middleware');

const apiRouter = require('../routes/api');
const webRouter = require('../routes/web');

function routeProvider(io = null) {
    const router = express.Router();

    // Add socket to request
    router.use(SocketMiddleware(io));

    /**
     * Load all the routes here
     */
    router.use('/api', apiRouter);
    router.use('/', webRouter);

    // return router
    return router;
}

module.exports = routeProvider;
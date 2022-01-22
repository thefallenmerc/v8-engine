const logger = require("../config/logger");
const { ErrorLoggerService } = require("../services/error-logger-service");


function handledMiddleware(middlewares) {
    // create wrapped routes
    return generateHandledMiddleware(middlewares);
}


function generateHandledMiddleware(middleware) {
    // return a new middleware
    return (req, res, next) => {
        return middleware(req, res, next).catch(err => {
            logger.error("handler crashed at route " + req.originalUrl, [err && err.message, err]);
            ErrorLoggerService.logErrorPlain('SERVER_CRASH', 'handledMiddleware', err.message, err);
            return res.status(500).json({
                "message": "Server error",
                "errorMessage": err && err.message,
                "extraInfo": process.env.APP_ENV === "development" ? err : undefined
            });
        });
    }
}

module.exports = handledMiddleware;
const ErrorLog = require("../models/error-log");
const logger = require("../config/logger");

const LOGGER_ERROR_TYPES = {
    DEFAULT: "DEFAULT",
    MAIL_PREPARE_FAILED: "MAIL_PREPARE_FAILED",
    MAIL_SEND_FAILED: "MAIL_SEND_FAILED",
    CRON_FAILED: "CRON_FAILED",
    ERROR_LOGGER_FAILED: "ERROR_LOGGER_FAILED",
}

class ErrorLoggerService {
    static async logErrorPlain(errorType, secondaryErrorType, message, error) {
        return ErrorLoggerService.logError({
            errorType,
            secondaryErrorType,
            message,
            error
        })
    }
    /**
     * log error
     */
    static async logError({
        errorType = LOGGER_ERROR_TYPES.DEFAULT,
        secondaryErrorType = "",
        message = "",
        error = null
    }) {
        try {
            return await ErrorLog.create({
                type: errorType,
                secondaryErrorType,
                message,
                error: JSON.stringify(error)
            });
        } catch (error) {
            try {
                return await ErrorLog.create({
                    type: LOGGER_ERROR_TYPES.ERROR_LOGGER_FAILED,
                    secondaryErrorType,
                    message,
                    error: JSON.stringify(error)
                });
            } catch (error) {
                // cant do anythin now
                console.error("Error log failed!");
                return false;
            }
        }
        try {
            logger.error('Error logger logged an error! ', [
                {
                    errorType,
                    secondaryErrorType,
                    message,
                    error,
                }
            ]);
        } catch (error) { }
    }


}

module.exports = { ErrorLoggerService, LOGGER_ERROR_TYPES }
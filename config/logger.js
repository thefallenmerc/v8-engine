/**
 * Configurations of logger.
 */
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path');

const myFormat = printf(({ level, message, label, timestamp, metadata }) => {
    return `${timestamp} [${label}] ${level}: ${message}\n${JSON.stringify(metadata, null, 2)}`;
});

const transport = new transports.File({
    filename: 'success.log',
    dirname: __dirname + '/../logs',
    format: format.combine(
        myFormat
    )
});



const logger = createLogger({
    level: 'info',
    format: combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
    ),
    transports: [
        transport
    ]
});

module.exports = logger;
const Transporter = require('../config/mail');
const { ErrorLoggerService, LOGGER_ERROR_TYPES } = require('../services/error-logger-service');

module.exports = class Mail {
    /**
     * 
     * @param {*} options.from from id and optional user name  as "<user name>" prefixed 
     * @param {*} options.to comma seperated email ids 
     * @param {*} options.subject Mail subject 
     * @param {*} options.text Mail text version 
     * @param {*} options.html Mail html version 
     * 
     */
    constructor(options = {
        from: null, to: '', subject: 'New Mail', text: '', html: ''
    }, other = {}) {
        this.from = options.from || process.env.MAIL_USER;
        this.to = options.to;
        this.subject = options.subject;
        this.text = options.text;
        this.html = options.html;

        this.other = other;

        this.prepare();
    }

    prepare() { }

    // render the email as html
    render(res) {
        res.header('Content-Type', 'text/html');
        return res.send(this.html);
    }

    send() {
        const transporter = new Transporter();
        return transporter.sendMail({
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text,
            html: this.html
        }).catch(err => {
            ErrorLoggerService.logErrorPlain(LOGGER_ERROR_TYPES.MAIL_SEND_FAILED, "", err.message, err);
            throw err;
        });
    }
}
const twilio = require('twilio');
const logger = require('./logger');

module.exports = class SMS {
    constructor(to, message) {
        this.body = message;
        this.to = to;
    }

    /**
     * Initialize the client and send the message
     */
    async send() {
        if (process.env.APP_ENV === "test") return;

        try {
            const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
            const message = await client.messages.create({
                body: this.body,
                to: this.to,
                from: process.env.TWILIO_NUMBER
            });
            return message;
        } catch (error) {
            console.log("Could not send SMS", {
                TWILIO_SID: process.env.TWILIO_SID,
                TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
                error
            })
            logger.error("Could not send SMS", {
                TWILIO_SID: process.env.TWILIO_SID,
                TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
                error
            })
        }
    }
}
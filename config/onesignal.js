const { default: axios } = require("axios");
const logger = require("./logger");

module.exports = class OneSignalClient {
    /**
     * Send push to userIds
     * @param {*} userIds 
     * @param {*} title 
     * @param {*} body 
     * @param {*} web_url 
     * @returns 
     */
    static async sendPush(userIds = [], title = "Push Title", body = "Push Body", web_url = "") {

        // filter out invalid uuids
        userIds = userIds.filter(userId => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId + ""));

        // TODO: remove the invalid uuids from table

        // check if we actually have clients?
        if (userIds.length === 0) {
            return logger.info("onesignal sendPush stopped due to no clients", { title, body });
        }

        try {
            return await axios.post("https://onesignal.com/api/v1/notifications", {
                app_id: process.env.ONE_SIGNAL_APP_ID,
                include_player_ids: [...userIds],
                headings: {
                    "en": title ? title : "Push Title"
                },
                contents: {
                    "en": body ? body : "Push Body"
                },
                web_url
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]) {
                // get the invalid uuid
            }
            logger.error("onesignal sendPush failed", { error, response: error.response && error.response.data && error.response.data });
            return null;
        }
    }
}
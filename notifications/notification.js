module.exports = class Notification {

  constructor(user, title = "New notification", body = "", web_url = "") {
    this.user = user;
    this.title = title;
    this.body = body;
    this.web_url = web_url;
  }

  async send() {
    if (process.env.NODE_ENV !== "test") {
      if (Array.isArray(this.user)) {
        for (const user of this.user) {
          await this.trigger(user);
        }
      } else {
        await this.trigger(this.user);
      }
    }
  }

  async trigger(user = null) {
    // TODO: add push notification here
    // send mail
    // await this.sendMail(user);
    // await this.sendPush(user);
    // await this.sendSMS(user);
  }

  async sendMail(user = null) {
    // Build mail and send it
  }

  async sendPush(user = null) {
    // Build push and send it
  }

  async sendSMS(user) {
    // Build sms and send it
  }
}
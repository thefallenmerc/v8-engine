module.exports = class SampleController {
  static index(req, res) {
    return res.json({ message: "V8 Engine" })
  }

  static create(req, res) { }

  static update(req, res) { }

  static delete(req, res) { }
};

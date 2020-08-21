const Validator = require('./validator');

class SampleValidator extends Validator {

  constructor(data = {}, rules = {}, messages = {}) {
    /**
     * Define You rules here
     */
    rules = {
    };

    super(data, rules, messages);
  }

}

module.exports = SampleValidator;
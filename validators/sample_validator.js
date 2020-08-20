"use strict";

const ValidatorJS = require("validatorjs");

/**
 * Create Company Validator
 */
class Validator {
  /**
   * Constructor
   * @param {*} req 
   */
  constructor(req) {
    /**
     * Rules
     */
    this.rules = {};

    /**
     * Error Messages
     */
    this.messages = {};

    /**
     * Validated fields' object
     */
    this.validated = {};

    /**
     * Object to be validated
     */
    this.data = req.body;

    /**
     * Validator
     */
    this.validator = new ValidatorJS(this.data, this.rules, this.messages);

    /**
     * Validate all the fields
     */
    this.getValidated();
  }

  /**
   * Check if the validator fails
   */
  fails() {
    return this.validator.fails();
  }

  /**
   * Check if the validator passes
   */
  passes() {
    return this.validator.passes();
  }

  errors() {
    return this.validator.errors;
  }

  /**
   * Get only the validated content
   */
  getValidated(getNull = false) {
    for (const rule in this.rules) {
      if(this.data[rule] == undefined) {
        if(getNull) {
          this.validated[rule] = null;
        }
      } else {
        this.validated[rule] = this.data[rule];
      }
    }
  }
}

module.exports = Validator;
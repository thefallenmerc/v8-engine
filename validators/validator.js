"use strict";

const Mongoose = require("mongoose");
const ValidatorJS = require("validatorjs");

// register a rule for mongoId
ValidatorJS.register('mongoid', function (value) {
    if (!value) return true;
    return Mongoose.isValidObjectId(value);
}, 'The :attribute is not a valid id');

// register a rule for digits (actual one doesnt work on numerics)
ValidatorJS.register('digit',
    function (value, requirement) {
        const digit = parseInt(requirement);
        return value.toString().trim().length === digit;
    },
    'The :attribute is not :digit digits.',
    function (_template, rule, _getAttributeName) {
        const parameters = rule.getParameters();
        return {
            digit: parameters[0]
        };
    });

/**
 * Create Base Validator, Do not touch
 */
class Validator {
    /**
     * Constructor
     * @param {*} req 
     */
    constructor(data = {}, rules = {}, messages = {}) {
        /**
         * Rules
         */
        this.rules = rules;

        /**
         * Error Messages
         */
        this.messages = messages;

        /**
         * Validated fields' object
         */
        this.validated = {};

        /**
         * Object to be validated
         */
        this.data = data;

        /**
         * Validator
         */
        this.validator = new ValidatorJS(this.data, this.rules, this.messages);

        /**
         * Validate all the fields
         */
        this.getValidated();
    }

    static make(data = {}, rules = {}, messages = {}) {
        return new Validator(data, rules, messages);
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
            if (this.data[rule] == undefined) {
                if (getNull) {
                    this.validated[rule] = null;
                }
            } else {
                this.validated[rule] = this.data[rule];
            }
        }
    }
}

module.exports = Validator;
const Resource = require('./resource');

module.exports = class SampleResource extends Resource {

    format(resource) {
        return resource;
    }

}
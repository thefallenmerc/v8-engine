const Resource = require('./resource');

module.exports = class ProfileResource extends Resource {

    format(resource) {
        return resource;
    }

}
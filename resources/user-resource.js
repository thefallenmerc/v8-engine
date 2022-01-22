const Resource = require('./resource');

module.exports = class UserResource extends Resource {

    format(resource) {
        return {
            id: resource.id,
            name: resource.name,
            mobile: resource.mobile,
            email: resource.email,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        };
    }

}
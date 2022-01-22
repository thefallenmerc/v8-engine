function addToJSONToError() {
    // add toJson to error
    if (!('toJSON' in Error.prototype))
        Object.defineProperty(Error.prototype, 'toJSON', {
            value: function () {
                var alt = {};

                Object.getOwnPropertyNames(this).forEach(function (key) {
                    if (key === "stack") {
                        alt[key] = this[key].split("\n");
                    } else {
                        alt[key] = this[key];
                    }
                }, this);

                return alt;
            },
            configurable: true,
            writable: true
        });
}

module.exports = addToJSONToError;
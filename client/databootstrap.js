/**
 * # `dataBootstrap` factory
 *
 * Assumes the page is bootstrapped with the `window.bootstrap` object and allows
 * safe reading from the object (returns undefined if property doesn't exist).
 *
 * This object is not for everyone. This object assumes that you have a single
 * data bootstrap, that the data bootstrap is global object (attached to window),
 * and that the object is live from the time you inject the dataBootstrap.
 *
 * ```javascript
 * // require then
 * dataBootstrap.get("someProperty"); // === something || undefined
 * dataBootstrap.get("some.nested.property"); // === something || undefined
 *
 * // don't like the window.bootstrap object? Require then
 * dataBootstrap.reload("notBootstrap");
 * ```
 */

var dataBootstrap = window.bootstrap || {};

// Get the value of a key from an object without throwing an error if
// the key does not exist.
//
// Params
// key {String} with dot notation for hierarchical access.
// obj {mixed} an object to grab the value from.
//
// Returns
// value or undefined
var getByProp = function(key, obj) {
    var val;
    key = key.split(".");
    do {
        val = obj = (obj && obj[key[0]]);
        key.shift();
    } while (val && key[0]);
    return val;
};

module.exports = {
    reload: function(key) {
        var val = getByProp(key, window);
        if (val) {
            dataBootstrap = val;
        } else {
            // Good programming shouldn't get here.
            throw new Error("dataBootstrap: reload could not find key: " + key);
        }
    },
    get: function(key) {
        return getByProp(key, dataBootstrap);
    },
};

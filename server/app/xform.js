
exports.exists = function(xform) {
    try {
        xform = require("./xforms/" + xform);
        return true;
    } catch(e) {
        return false;
    }
};


// This is going to get nasty really quick, but for now...
exports.bestGuess = function (u) {
    if (/\.wikipedia\./.test(u)) {
        return {
            name: "wikipedia",
            f: require("./xforms/wikipedia"),
        };
    } else {
        return {
            name: "normal",
            f: require("./xforms/normal"),
        };
    }
};

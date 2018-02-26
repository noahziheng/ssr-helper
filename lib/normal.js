exports.mergeObject = function () {
    let target = {}
    let sources = [].slice.call(arguments);
    sources.forEach(function (source) {
        for (let prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
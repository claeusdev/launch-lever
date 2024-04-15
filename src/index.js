"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchLever = exports.isOn = void 0;
var YamlParser_1 = require("./YamlParser");
function isOn(status) {
    return status === "on";
}
exports.isOn = isOn;
var LaunchLever = /** @class */ (function () {
    function LaunchLever(flagsFile) {
        this._flags = [];
        this._flags = new YamlParser_1.YamlParser(flagsFile).readFile().getFlags();
    }
    LaunchLever.prototype.toggles = function () {
        return this._flags;
    };
    LaunchLever.prototype.flags = function () {
        var toggles = {};
        for (var _i = 0, _a = this._flags; _i < _a.length; _i++) {
            var t = _a[_i];
            toggles[t.name] = t.status;
        }
        return toggles;
    };
    return LaunchLever;
}());
exports.LaunchLever = LaunchLever;
var flags = new LaunchLever("./src/file.yml");
console.log(flags.flags());

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileParser = void 0;
var FileParser = /** @class */ (function () {
    function FileParser(filename, type) {
        if (type === void 0) { type = "yml"; }
        this._filename = "";
        this._type = "yml";
        this._filename = filename;
        this._type = type;
    }
    return FileParser;
}());
exports.FileParser = FileParser;

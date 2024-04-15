"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlParser = void 0;
var node_fs_1 = require("node:fs");
var yaml_1 = require("yaml");
var FileParser_1 = require("./FileParser");
var YamlParser = /** @class */ (function (_super) {
    __extends(YamlParser, _super);
    function YamlParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._yamlFlags = [];
        return _this;
    }
    YamlParser.prototype.readFile = function () {
        var yamlObj = (0, node_fs_1.readFileSync)(this._filename, "utf8");
        var flags = (0, yaml_1.parse)(yamlObj);
        for (var key in flags) {
            this._yamlFlags.push({
                name: key,
                description: flags[key].description[0],
                status: flags[key].status[0]
            });
        }
        return this;
    };
    YamlParser.prototype.getFlags = function () {
        return this._yamlFlags;
    };
    return YamlParser;
}(FileParser_1.FileParser));
exports.YamlParser = YamlParser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        index: true,
    },
}, {
    collection: "tags",
});
exports.TagModel = (0, mongoose_1.model)("tags", schema);

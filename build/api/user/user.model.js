"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        require: true,
    },
}, {
    collection: "users",
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("users", schema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteModel = void 0;
var mongoose_1 = require("mongoose");
var constant_1 = require("../../constant");
var schema = new mongoose_1.Schema({
    postId: {
        type: mongoose_1.Types.ObjectId,
        require: true,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        require: true,
    },
    vote: {
        require: true,
        type: Number,
        enum: constant_1.VoteAction,
        default: constant_1.VoteAction.normal,
    },
}, {
    collection: "votes",
    timestamps: true,
});
schema.virtual("postInfo", {
    ref: "posts",
    justOne: true,
    localField: "postId",
    foreignField: "_id",
});
schema.virtual("userInfo", {
    ref: "users",
    justOne: true,
    localField: "userId",
    foreignField: "_id",
});
schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });
exports.VoteModel = (0, mongoose_1.model)("votes", schema);

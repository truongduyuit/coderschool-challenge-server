"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    postId: {
        type: mongoose_1.Types.ObjectId,
        require: true,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        require: true,
    },
    comment: {
        require: true,
        type: String,
    },
    replyToCommentId: {
        type: mongoose_1.Types.ObjectId,
    },
    level: {
        type: Number,
        default: 0,
    },
}, {
    collection: "comments",
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
schema.virtual("replyToInfo", {
    ref: "comments",
    justOne: true,
    localField: "replyToCommentId",
    foreignField: "_id",
});
schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });
exports.CommentModel = (0, mongoose_1.model)("comments", schema);

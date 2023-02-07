"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
var mongoose_1 = require("mongoose");
var constant_1 = require("../../constant");
var schema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
        index: true,
    },
    content: {
        type: String,
    },
    tags: [
        // in this case don't need to ref to Tags model
        // tag model only use to suggest
        // {
        //   type: Types.ObjectId,
        //   ref: "tags",
        //   require: true,
        // },
        {
            type: String,
            require: true,
        },
    ],
    // user created this post
    userId: {
        type: mongoose_1.Types.ObjectId,
        require: true,
    },
    // Use enums for future expansion
    status: {
        type: String,
        enum: Object.values(constant_1.RecordStatus),
        default: constant_1.RecordStatus.active,
    },
}, {
    collection: "posts",
    timestamps: true,
});
// schema.virtual("tagsInfo", {
//   ref: "tags",
//   justOne: false,
//   localField: "tags",
//   foreignField: "_id",
// });
schema.virtual("userInfo", {
    ref: "users",
    justOne: true,
    localField: "userId",
    foreignField: "_id",
});
schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });
exports.PostModel = (0, mongoose_1.model)("posts", schema);

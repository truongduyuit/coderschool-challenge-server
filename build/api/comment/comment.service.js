"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
var utils_1 = require("../../utils");
var comment_model_1 = require("./comment.model");
exports.CommentService = new utils_1.MongooseBaseService(comment_model_1.CommentModel);

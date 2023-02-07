"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
var utils_1 = require("../../utils");
var post_model_1 = require("./post.model");
exports.PostService = new utils_1.MongooseBaseService(post_model_1.PostModel);

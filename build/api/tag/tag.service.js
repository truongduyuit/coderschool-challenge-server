"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
var utils_1 = require("../../utils");
var tag_model_1 = require("./tag.model");
exports.TagService = new utils_1.MongooseBaseService(tag_model_1.TagModel);

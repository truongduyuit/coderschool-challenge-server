"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../../middleware/validate");
var createTag_dto_1 = require("./dto/createTag.dto");
var getTags_dto_1 = require("./dto/getTags.dto");
var tag_controller_1 = __importDefault(require("./tag.controller"));
var router = (0, express_1.Router)();
// check only user logged in can create tag
router.post("/", validate_1.Auth, (0, validate_1.Valid)(createTag_dto_1.CreateTagDto, 1 /* RequestType.body */), tag_controller_1.default.createTag);
router.get("/", (0, validate_1.Valid)(getTags_dto_1.GetTagDto, 0 /* RequestType.query */), tag_controller_1.default.getTags);
exports.default = router;

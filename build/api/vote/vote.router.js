"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../../middleware/validate");
var checkVote_dto_1 = require("../post/dto/checkVote.dto");
var vote_dto_1 = require("./dto/vote.dto");
var vote_controller_1 = __importDefault(require("./vote.controller"));
var vote_middleware_1 = __importDefault(require("./vote.middleware"));
var router = (0, express_1.Router)();
router.post("/", validate_1.Auth, (0, validate_1.Valid)(vote_dto_1.VoteDto, 1 /* RequestType.body */), vote_middleware_1.default.createVote, vote_controller_1.default.createVote);
router.post("/check", validate_1.Auth, (0, validate_1.Valid)(checkVote_dto_1.CheckVoteDto, 1 /* RequestType.body */), vote_controller_1.default.checkVote);
exports.default = router;

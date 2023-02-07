"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteService = void 0;
var utils_1 = require("../../utils");
var vote_model_1 = require("./vote.model");
exports.VoteService = new utils_1.MongooseBaseService(vote_model_1.VoteModel);

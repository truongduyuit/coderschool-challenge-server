"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteAction = void 0;
var VoteAction;
(function (VoteAction) {
    VoteAction[VoteAction["upvote"] = 1] = "upvote";
    VoteAction[VoteAction["downvote"] = -1] = "downvote";
    VoteAction[VoteAction["normal"] = 0] = "normal";
})(VoteAction = exports.VoteAction || (exports.VoteAction = {}));

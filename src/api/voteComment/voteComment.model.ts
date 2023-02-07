import { Document, Schema, model, Types } from "mongoose";
import { RecordStatus, VoteAction } from "../../constant";

export interface IVoteComment extends Document {
  commentId: string;
  commentInfo: {
    _id: string;
    comment: string;
  };

  userId: string;
  userInfo: {
    _id: string;
    email: string;
  };
  vote: VoteAction;
  status: RecordStatus;
}

const schema = new Schema(
  {
    commentId: {
      type: Types.ObjectId,
      require: true,
    },
    userId: {
      type: Types.ObjectId,
      require: true,
    },
    vote: {
      require: true,
      type: Number,
      enum: VoteAction,
      default: VoteAction.normal,
    },
    status: {
      index: true,
      type: String,
      enum: Object.values(RecordStatus),
      default: RecordStatus.active,
    },
  },
  {
    collection: "voteComments",
    timestamps: true,
  },
);

schema.virtual("commentInfo", {
  ref: "comments",
  justOne: true,
  localField: "commentId",
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

export const VoteCommentModel = model<IVoteComment>("voteComments", schema);

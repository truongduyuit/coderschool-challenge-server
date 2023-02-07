import { Document, Schema, model, Types } from "mongoose";
import { RecordStatus, VoteAction } from "../../constant";

export interface IVote extends Document {
  postId: string;
  postInfo: {
    _id: string;
    title: string;
    content: string;
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
    postId: {
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
    collection: "votes",
    timestamps: true,
  },
);

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

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const VoteModel = model<IVote>("votes", schema);

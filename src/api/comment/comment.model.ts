import { Document, Schema, model, Types } from "mongoose";

export interface IComment extends Document {
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
  comment: string;
  replyToCommentId: string;
  childCommentIds: string[];
  replyToInfo: {};
  level: number;
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
    comment: {
      require: true,
      type: String,
    },
    replyToCommentId: {
      type: Types.ObjectId,
    },
    childCommentIds: [
      {
        type: Types.ObjectId,
      },
    ],
    level: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "comments",
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

schema.virtual("replyToInfo", {
  ref: "comments",
  justOne: true,
  localField: "replyToCommentId",
  foreignField: "_id",
});

schema.virtual("childCommentInfo", {
  ref: "comments",
  justOne: false,
  localField: "childCommentIds",
  foreignField: "_id",
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const CommentModel = model<IComment>("comments", schema);

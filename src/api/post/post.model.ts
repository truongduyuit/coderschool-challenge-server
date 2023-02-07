import { Document, Schema, model, Types } from "mongoose";
import { RecordStatus } from "../../constant";

export interface IPost extends Document {
  title: string;
  content?: string;
  tags: string[];
  userId: string;
  userInfo: {
    _id: string;
    email: string;
  };
  status: RecordStatus;
}

const schema = new Schema(
  {
    title: {
      type: String,
      require: true,
      index: true,
    },
    content: {
      type: String,
    },
    tags: [
      // in this case don't need to ref to Tags model
      // tag model only use to suggest
      // {
      //   type: Types.ObjectId,
      //   ref: "tags",
      //   require: true,
      // },

      {
        type: String,
        require: true,
      },
    ],
    // user created this post
    userId: {
      type: Types.ObjectId,
      require: true,
    },
    // Use enums for future expansion
    status: {
      index: true,
      type: String,
      enum: Object.values(RecordStatus),
      default: RecordStatus.active,
    },
  },
  {
    collection: "posts",
    timestamps: true,
  },
);

// schema.virtual("tagsInfo", {
//   ref: "tags",
//   justOne: false,
//   localField: "tags",
//   foreignField: "_id",
// });

schema.virtual("userInfo", {
  ref: "users",
  justOne: true,
  localField: "userId",
  foreignField: "_id",
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });
export const PostModel = model<IPost>("posts", schema);

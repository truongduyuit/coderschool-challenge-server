import { Document, Schema, model } from "mongoose";

export interface ITag extends Document {
  name: string;
}

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
  },
  {
    collection: "tags",
  },
);

export const TagModel = model<ITag>("tags", schema);

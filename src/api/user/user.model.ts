import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const schema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

export const UserModel = model<IUser>("users", schema);

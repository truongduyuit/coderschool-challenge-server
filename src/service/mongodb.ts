import mongoose from "mongoose";
import { ConfigEnv } from "../configs";

class Mongoose {
  public static init(options?: mongoose.ConnectOptions): void {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(ConfigEnv.MONGO_CONNECTION_STRING, {
        user: ConfigEnv.DB_USER,
        pass: ConfigEnv.DB_PASS,
        ...options,
      })
      .then(() => {
        console.log(`Connect to db: ${ConfigEnv.MONGO_CONNECTION_STRING}`);
      })
      .catch((err: any) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running.\n" + err);
        process.exit(1);
      });

    const db = mongoose.connection;

    db.on("error", (err: any) => console.log("MongoDB error:\n" + err));
  }
}

export { Mongoose };

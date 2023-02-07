import { MongooseBaseService } from "../../utils";
import { IUser, UserModel } from "./user.model";

export const UserService = new MongooseBaseService<IUser>(UserModel);

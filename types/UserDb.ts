import { IUser } from "@/models/User";
import { Schema } from 'mongoose';


export interface IUserDb extends IUser {
    _id: Schema.Types.ObjectId; // You can also specify types such as mongoose.Types.ObjectId
  }
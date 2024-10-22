import { Schema, model, models, Document } from 'mongoose';

// Define the interface for the User schema
export interface IUser extends Document {
  email: String;
  name: String;
  image?: String;
}

// Create the User schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  image: {
    type: String
  }
});

// Create the User model
const User = models.User || model<IUser>('User', UserSchema);

export default User;
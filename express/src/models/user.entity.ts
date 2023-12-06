import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const UserSchemaValidation = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  email: Joi.string().email().required()
});

export interface IUser extends Document {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  // status: boolean;
  // salt: string;
  // confirmationToken: string | null;
  // recoveryToken: string | null;
  role: string[];
  createdAt: Date;
}

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      }
    },
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // status: { type: Boolean, default: false },
    // salt: { type: String, required: true },
    // confirmationToken: { type: String, default: null },
    // recoveryToken: { type: String, default: null },
    role: { type: [String], default: ['user'] },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

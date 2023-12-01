import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const UserSchemaValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required()
});

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
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
    email: { type: String, required: true, unique: true }
  },
  { _id: false }
);

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

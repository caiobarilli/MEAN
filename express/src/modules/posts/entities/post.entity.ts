import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const PostSchemaValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
});

export interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
}

const postSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      }
    },
    title: { type: String, required: true },
    content: { type: String, required: true }
  },
  { _id: false }
);

const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;

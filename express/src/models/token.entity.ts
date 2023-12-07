import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IToken extends Document {
  userId: string;
  value: string;
  createdAt: Date;
}

const tokenSchema: Schema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
    default: function genUUID() {
      return uuidv4();
    }
  },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const TokenModel = mongoose.model<IToken>('Token', tokenSchema);

export default TokenModel;

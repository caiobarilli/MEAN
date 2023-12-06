import mongoose, { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  userId: string;
  token: string;
  createdAt: Date;
}

const tokenSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const TokenModel = mongoose.model<IToken>('Token', tokenSchema);

export default TokenModel;

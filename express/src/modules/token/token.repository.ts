import tokenModel, { IToken } from '../../models/token.entity';

class TokenRepository {
  public async createToken(userId: string, value: string): Promise<IToken> {
    const newToken = new tokenModel({ userId, value });
    return await newToken.save();
  }

  public async getTokenById(userId: string): Promise<string | undefined> {
    const token = await tokenModel.findOne({ userId });
    if (token) {
      return token.value;
    }
    return;
  }
}

export default new TokenRepository();

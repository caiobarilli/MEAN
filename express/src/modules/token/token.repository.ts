import tokenModel, { IToken } from '../../models/token.entity';

class TokenRepository {
  public createToken(userId: string, value: string): Promise<IToken> {
    return tokenModel.create({ userId, value });
  }

  public getTokenById(userId: string): Promise<string | undefined> {
    return tokenModel.findOne({ userId });
  }
}

export default new TokenRepository();

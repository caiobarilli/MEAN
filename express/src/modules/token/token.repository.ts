import TokenModel, { IToken } from '../../models/token.entity';

class TokenRepository {
  public async createToken(userId: string, token: string): Promise<IToken> {
    try {
      const newToken = new TokenModel({ userId, token });
      return await newToken.save();
    } catch (error) {
      throw new Error(
        `Erro ao criar token no banco de dados: ${error.message}`
      );
    }
  }

  public async validateToken(userId: string, token: string): Promise<boolean> {
    try {
      const validToken = await TokenModel.findOne({ userId, token });
      return !!validToken; // Retorna true se o token for válido, false caso contrário
    } catch (error) {
      throw new Error(
        `Erro ao validar token no banco de dados: ${error.message}`
      );
    }
  }
}

export default new TokenRepository();

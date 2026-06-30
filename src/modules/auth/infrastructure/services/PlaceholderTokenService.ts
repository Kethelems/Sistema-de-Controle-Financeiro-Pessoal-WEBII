import jwt from "jsonwebtoken";
import { InvalidTokenError } from "../../application/errors/InvalidTokenError.js";
import type { AuthTokenPayload, TokenService } from "../../application/services/TokenService.js";

const SECRET = process.env.JWT_SECRET ?? "dev-secret-key";

export class PlaceholderTokenService implements TokenService {
  public async sign(payload: AuthTokenPayload): Promise<string> {
    return jwt.sign(payload, SECRET, { expiresIn: "7d" });
  }

  public async verify(token: string): Promise<AuthTokenPayload> {
    try {
      const decoded = jwt.verify(token, SECRET) as AuthTokenPayload;
      return { userId: decoded.userId };
    } catch {
      throw new InvalidTokenError();
    }
  }
}

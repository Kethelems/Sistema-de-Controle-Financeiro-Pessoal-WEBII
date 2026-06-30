import { createHash } from "node:crypto";
import type { PasswordHasher } from "../../application/services/PasswordHasher.js";

export class PlaceholderPasswordHasher implements PasswordHasher {
  public async hash(value: string): Promise<string> {
    return createHash("sha256").update(value).digest("hex");
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    return createHash("sha256").update(value).digest("hex") === hash;
  }
}

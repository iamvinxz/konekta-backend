import type { TokenPayload } from "@/helper/jwt.ts";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}

export {};

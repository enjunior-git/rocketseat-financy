import jwt, { type SignOptions } from "jsonwebtoken";
import { ENV } from "../env.js";

export type JwtPayload = {
  id: string;
  email: string;
};

export const signJwt = async (payload: JwtPayload, expiresIn = "1d"): Promise<string> => {
  const options: SignOptions = {
    expiresIn: expiresIn as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(payload, ENV.JWT_SECRET, options);
};

export const verifyJwt = async (token: string): Promise<JwtPayload> => {
  const payload = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;

  if (!payload) {
    throw new Error("Invalid token");
  }

  return payload;
};

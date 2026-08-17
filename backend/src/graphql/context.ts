import type { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { verifyJwt } from "../lib/jwt.js";

export type GraphqlContext = {
  userId: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;
  let token: string | undefined;
  let userId: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length);

    try {
      const payload = await verifyJwt(token);
      userId = payload.id;
    } catch {
      userId = undefined;
    }
  }

  return {
    userId,
    token,
    req,
    res,
  };
};

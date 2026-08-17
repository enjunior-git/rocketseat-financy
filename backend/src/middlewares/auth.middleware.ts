import type { MiddlewareFn } from "type-graphql";
import type { GraphqlContext } from "../graphql/context.js";

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
  if (!context.userId) {
    throw new Error("Not authenticated");
  }

  return next();
};

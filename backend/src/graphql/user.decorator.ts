import { createParameterDecorator, type ResolverData } from "type-graphql";
import type { User } from "../../generated/prisma/client.js";
import { createPrismaClient } from "../lib/prisma.js";
import type { GraphqlContext } from "./context.js";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
      if (!context.userId) {
        return null;
      }

      return createPrismaClient().user.findUnique({
        where: {
          id: context.userId,
        },
      });
    },
  );
};

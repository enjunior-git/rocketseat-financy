import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express, { type Express } from "express";
import { buildSchema } from "type-graphql";
import { ENV } from "./env.js";
import { buildContext } from "./graphql/context.js";
import { formatGraphqlError } from "./graphql/errors.js";
import { AuthResolver } from "./resolvers/auth.resolver.js";
import { CategoryResolver } from "./resolvers/category.resolver.js";
import { HealthcheckResolver } from "./resolvers/healthcheck.resolver.js";
import { TransactionResolver } from "./resolvers/transaction.resolver.js";
import { UserResolver } from "./resolvers/user.resolver.js";

type CreateAppOptions = {
  corsOrigin?: string;
  emitSchemaFile?: string | boolean;
};

type GraphqlApp = {
  app: Express;
  server: ApolloServer;
};

export async function createApp(options: CreateAppOptions = {}): Promise<GraphqlApp> {
  const app = express();

  app.use(
    cors({
      origin: options.corsOrigin ?? ENV.CORS_ORIGIN,
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      HealthcheckResolver,
      CategoryResolver,
      TransactionResolver,
      UserResolver,
    ],
    validate: false,
    emitSchemaFile: options.emitSchemaFile ?? "./schema.graphql",
  });

  const server = new ApolloServer({
    schema,
    formatError: formatGraphqlError,
  });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server, { context: buildContext }));

  return {
    app,
    server,
  };
}

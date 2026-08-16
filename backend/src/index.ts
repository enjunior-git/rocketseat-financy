import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { ENV } from "./env.js";
import { CategoryResolver } from "./resolvers/category.resolver.js";
import { HealthcheckResolver } from "./resolvers/healthcheck.resolver.js";
import { TransactionResolver } from "./resolvers/transaction.resolver.js";

async function main() {
  const app = express();
  const port = 4000;

  app.use(
    cors({
      origin: ENV.CORS_ORIGIN,
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [HealthcheckResolver, CategoryResolver, TransactionResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen({ port }, () => {
    console.info(`Server started at http://127.0.0.1:${port}/graphql`);
  });
}

await main();

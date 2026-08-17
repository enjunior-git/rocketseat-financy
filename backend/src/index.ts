import "reflect-metadata";

import { createApp } from "./app.js";

async function main() {
  const port = 4000;
  const { app } = await createApp();

  app.listen({ port }, () => {
    console.info(`Server started at http://127.0.0.1:${port}/graphql`);
  });
}

await main();

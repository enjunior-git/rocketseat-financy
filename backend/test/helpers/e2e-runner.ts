import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe } from "vitest";
import type { PrismaClient } from "../../generated/prisma/client.js";
import { createPrismaClient } from "../../src/lib/prisma.js";

type E2eContext = {
  app: Awaited<ReturnType<typeof import("../../src/app.js").createApp>>["app"];
  prisma: PrismaClient;
};

type DefineSuite = (getContext: () => E2eContext) => void;

export function e2eRunner(name: string, defineSuite: DefineSuite) {
  describe(name, () => {
    const tempDirectory = mkdtempSync(join(tmpdir(), "financy-e2e-"));
    const databaseUrl = `file:${join(tempDirectory, `${randomUUID()}.test.db`)}`;

    let app: E2eContext["app"] | null = null;
    let server: Awaited<ReturnType<typeof import("../../src/app.js").createApp>>["server"] | null =
      null;
    let prisma: PrismaClient | null = null;

    const getContext = (): E2eContext => {
      if (!app || !prisma) {
        throw new Error("E2E context was accessed before setup.");
      }

      return {
        app,
        prisma,
      };
    };

    beforeAll(async () => {
      execFileSync(
        "pnpm",
        ["exec", "prisma", "db", "push", "--url", databaseUrl, "--schema", "prisma/schema.prisma"],
        {
          cwd: process.cwd(),
          env: process.env,
          stdio: "pipe",
        },
      );

      process.env.DATABASE_URL = databaseUrl;
      process.env.JWT_SECRET = "test-secret";
      process.env.CORS_ORIGIN = "http://localhost:5173";

      prisma = createPrismaClient(databaseUrl);
      await prisma.$connect();

      const { createApp } = await import("../../src/app.js");
      const graphqlApp = await createApp({
        corsOrigin: process.env.CORS_ORIGIN,
        emitSchemaFile: false,
      });

      app = graphqlApp.app;
      server = graphqlApp.server;
    });

    afterAll(async () => {
      if (server) {
        await server.stop();
      }

      if (prisma) {
        await prisma.$disconnect();
      }

      rmSync(tempDirectory, { recursive: true, force: true });
    });

    defineSuite(getContext);
  });
}

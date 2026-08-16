import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe } from "vitest";
import type { PrismaClient } from "../../generated/prisma/client.js";
import { createPrismaClient } from "../../src/lib/prisma.js";

type IntegrationContext = {
  prisma: PrismaClient;
};

type DefineSuite = (getContext: () => IntegrationContext) => void;

export function integrationRunner(name: string, defineSuite: DefineSuite) {
  describe(name, () => {
    const tempDirectory = mkdtempSync(join(tmpdir(), "financy-integration-"));
    const databaseUrl = `file:${join(tempDirectory, `${randomUUID()}.test.db`)}`;

    let prisma: PrismaClient | null = null;

    const getContext = (): IntegrationContext => {
      if (!prisma) {
        throw new Error("Integration context was accessed before setup.");
      }

      return { prisma };
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

      prisma = createPrismaClient(databaseUrl);
      await prisma.$connect();
    });

    afterEach(async () => {
      const currentPrisma = getContext().prisma;
      const tables = await currentPrisma.$queryRaw<Array<{ name: string }>>`
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
          AND name NOT LIKE 'sqlite_%'
      `;

      await currentPrisma.$executeRawUnsafe("PRAGMA foreign_keys = OFF");

      for (const table of tables) {
        await currentPrisma.$executeRawUnsafe(`DELETE FROM "${table.name}"`);
      }

      await currentPrisma.$executeRawUnsafe("PRAGMA foreign_keys = ON");
    });

    afterAll(async () => {
      if (prisma) {
        await prisma.$disconnect();
      }

      rmSync(tempDirectory, { recursive: true, force: true });
    });

    defineSuite(getContext);
  });
}

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.js";

export function createPrismaClient(databaseUrl?: string) {
  const adapter = new PrismaBetterSqlite3({
    url: databaseUrl ?? process.env.DATABASE_URL ?? "",
  });

  return new PrismaClient({ adapter });
}

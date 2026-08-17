import type { PrismaClient, User } from "../../generated/prisma/client.js";

export const createTestUser = async (
  prisma: PrismaClient,
  email = "user@example.com",
): Promise<User> => {
  return prisma.user.create({
    data: {
      name: "Test User",
      email,
    },
  });
};

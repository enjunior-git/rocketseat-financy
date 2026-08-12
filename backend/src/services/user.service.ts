import type { PrismaClient, Role, User } from "../../generated/prisma/client.js";

export type CreateUserInput = {
  name: string;
  email: string;
  password?: string;
  role?: Role;
};

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: input
    });
  }
}

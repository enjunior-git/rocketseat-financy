import type { PrismaClient, User } from "../../generated/prisma/client.js";

export type CreateUserInput = {
  name: string;
  email: string;
  password?: string;
};

export type UpdateUserInput = {
  name: string;
};

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ email, name, password }: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        name,
        ...(password !== undefined ? { password } : {}),
      },
    });
  }

  async update(id: string, { name }: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
